"""Import public WordPress posts into the connected blog database, resumably.
Backs up original responses before conversion. Never logs authentication values.
Requires Python markdownify, beautifulsoup4.
"""
from pathlib import Path
import json, urllib.request, urllib.error, time, re, html, hashlib
from urllib.parse import urlparse, urljoin
from markdownify import markdownify
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parent.parent
ENV=dict(l.split('=',1) for l in (ROOT/'.env.local').read_text().splitlines() if '=' in l and not l.startswith('#'))
DS='3dcb3c5e-8efd-8019-95db-000bd7d5eaab'
BACK=ROOT/'backups/wordpress';BACK.mkdir(parents=True,exist_ok=True)
ASSETS=ROOT/'public/images/blog';ASSETS.mkdir(parents=True,exist_ok=True)
def notion(endpoint, data=None, method=None):
 req=urllib.request.Request('https://api.notion.com/v1/'+endpoint,data=json.dumps(data).encode() if data is not None else None,headers={'Authorization':'Bearer '+ENV['NOTION_TOKEN'],'Notion-Version':'2026-03-11','Content-Type':'application/json'},method=method)
 for attempt in range(5):
  try:
   with urllib.request.urlopen(req,timeout=90) as r:return json.load(r)
  except urllib.error.HTTPError as e:
   if e.code==429:time.sleep(int(e.headers.get('Retry-After','2')));continue
   raise RuntimeError(str(e.code)+' '+e.read().decode()) from None
 raise RuntimeError('Rate limit persisted')
def wp(path):
 with urllib.request.urlopen('https://www.movings.sg/wp-json/wp/v2/'+path,timeout=60) as r:return json.load(r)
raw=BACK/'posts.json'
if not raw.exists():
 posts=[];page=1
 while True:
  batch=wp('posts?per_page=100&_embed&page='+str(page));posts+=batch
  if len(batch)<100:break
  page+=1
 raw.write_text(json.dumps(posts,ensure_ascii=False,indent=2),encoding='utf-8')
posts=json.loads(raw.read_text(encoding='utf-8'))
notion('data_sources/'+DS,{'properties':{'Status':{'select':{'options':[{'name':'Draft','color':'gray'},{'name':'Published','color':'green'}]}},'Slug':{'rich_text':{}},'Description':{'rich_text':{}},'Published date':{'date':{}},'Category':{'rich_text':{}},'WordPress ID':{'number':{}},'Original URL':{'url':{}},'Cover URL':{'url':{}}}},'PATCH')
existing=[];cursor=None
while True:
 d=notion('data_sources/'+DS+'/query',{'page_size':100,**({'start_cursor':cursor} if cursor else {})});existing+=d['results']
 if not d['has_more']:break
 cursor=d['next_cursor']
seen={x['properties'].get('WordPress ID',{}).get('number'):x['id'] for x in existing}
manifest_path=ROOT/'content/blog-import.json';manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else []
asset_map_path=BACK/'assets.json';asset_map=json.loads(asset_map_path.read_text()) if asset_map_path.exists() else {}
def asset(url):
 url=urljoin('https://www.movings.sg/',url)
 if url in asset_map:return asset_map[url]
 if urlparse(url).hostname not in ['movings.sg','www.movings.sg']:return url
 ext=Path(urlparse(url).path).suffix.lower()
 if ext not in ['.jpg','.jpeg','.png','.webp','.gif']:return url
 name=hashlib.sha256(url.encode()).hexdigest()[:20]+ext;dest=ASSETS/name
 if not dest.exists():
  with urllib.request.urlopen(url,timeout=60) as r:dest.write_bytes(r.read())
 public='https://movings-sg.vercel.app/images/blog/'+name;asset_map[url]=public;asset_map_path.write_text(json.dumps(asset_map,indent=2));return public
def rt(s):return [{'type':'text','text':{'content':s[:2000]}}] if s else []
for post in posts:
 if post['id'] in seen and any(x['wordpressId']==post['id'] for x in manifest):continue
 soup=BeautifulSoup(post['content']['rendered'],'html.parser')
 for el in soup.select('script,style,form'):el.decompose()
 for img in soup.find_all('img'):
  if img.get('src'):img['src']=asset(img['src'])
  for key in ['srcset','sizes','class','style']:img.attrs.pop(key,None)
 md=markdownify(str(soup),heading_style='ATX').strip()
 title=html.unescape(BeautifulSoup(post['title']['rendered'],'html.parser').get_text())
 description=BeautifulSoup(post['excerpt']['rendered'],'html.parser').get_text(' ',strip=True)[:300]
 featured=post.get('_embedded',{}).get('wp:featuredmedia',[])
 cover=asset(featured[0]['source_url']) if featured and 'source_url' in featured[0] else ''
 cats=[x['name'] for group in post.get('_embedded',{}).get('wp:term',[]) for x in group if x.get('taxonomy')=='category']
 props={'Name':{'title':rt(title)},'Status':{'select':{'name':'Published'}},'Slug':{'rich_text':rt(post['slug'])},'Description':{'rich_text':rt(description)},'Published date':{'date':{'start':post['date_gmt']+'Z'}},'Category':{'rich_text':rt(', '.join(cats))},'WordPress ID':{'number':post['id']},'Original URL':{'url':post['link']},'Cover URL':{'url':cover or None}}
 if post['id'] in seen:pageid=seen[post['id']]
 else:
  result=notion('pages',{'parent':{'type':'data_source_id','data_source_id':DS},'properties':props,'markdown':md});pageid=result['id'];seen[post['id']]=pageid
 (BACK/(str(post['id'])+'.md')).write_text(md,encoding='utf-8')
 manifest.append({'wordpressId':post['id'],'notionId':pageid,'slug':post['slug'],'originalPath':urlparse(post['link']).path,'title':title,'cover':cover})
 manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 print('Imported',post['id'],len(md),'characters',flush=True)
 time.sleep(.4)
print('Complete:',len(manifest),'posts;',len(asset_map),'copied images')
