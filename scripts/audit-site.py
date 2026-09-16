"""Read-only crawl: python scripts/audit-site.py [base URL]. Requires beautifulsoup4."""
import concurrent.futures, json, sys, time, urllib.request, urllib.error, urllib.parse, xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path
from bs4 import BeautifulSoup
base = sys.argv[1] if len(sys.argv)>1 else "http://localhost:3116"
def fetch(path):
    t=time.time()
    try:
        r=urllib.request.urlopen(base+path, timeout=40)
        return r.status,r.read(),round(time.time()-t,2)
    except urllib.error.HTTPError as e: return e.code,e.read(),round(time.time()-t,2)
sitemap=ET.fromstring(fetch("/sitemap.xml")[1])
paths=[urllib.parse.urlsplit(e.text).path for e in sitemap.iter() if e.tag.endswith("}loc")]
def audit(path):
    status,body,seconds=fetch(path);s=BeautifulSoup(body,"html.parser")
    def meta(**kw): return (s.find("meta",attrs=kw) or {}).get("content", "")
    errors=[]
    for block in s.select('script[type="application/ld+json"]'):
        try: json.loads(block.string or block.text)
        except ValueError: errors.append("Invalid JSON-LD")
    return dict(path=path,status=status,seconds=seconds,title=s.title.text if s.title else "",description=meta(name="description"),canonical=(s.find("link",rel="canonical") or {}).get("href", ""),h1=len(s.find_all("h1")),og=meta(property="og:title"),og_image=meta(property="og:image"),schema=len(s.select('script[type="application/ld+json"]')),errors=errors,links=[a["href"] for a in s.select("a[href]")],images=[i["src"] for i in s.select("img[src]")],missing_alt=len(s.select("img:not([alt])")))
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: records=list(pool.map(audit,paths))
links=set();images=set()
for r in records:
    for href in r.pop("links"):
        u=urllib.parse.urlsplit(urllib.parse.urljoin("https://www.movings.sg"+r["path"],href))
        if u.hostname in ["www.movings.sg","movings.sg","movings-sg.vercel.app"]: links.add(u.path+("?"+u.query if u.query else ""))
    images.update(u for u in r.pop("images") if u.startswith("/"))
extras=sorted((links|images)-set(paths));checks={}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for path,result in zip(extras,pool.map(fetch,extras)):checks[path]=result[0]
duplicates={}
for field in ["title","description"]:
    values=defaultdict(list)
    for p in records:values[p[field]].append(p["path"])
    duplicates[field]={k:v for k,v in values.items() if len(v)>1}
failures=[p for p in records if p["status"]!=200 or not p["title"] or not p["description"] or p["h1"]!=1 or not p["og"] or p["canonical"].rstrip("/")!=("https://www.movings.sg"+p["path"]).rstrip("/") or p["errors"]]
broken={k:v for k,v in checks.items() if v>=400}
result=dict(base=base,pages=records,internal_asset_checks=checks,failures=failures,broken_links_assets=broken,duplicates=duplicates)
Path("docs/launch-crawl.json").write_text(json.dumps(result,indent=2),encoding="utf-8")
print(json.dumps(dict(pages=len(records),links_and_images=len(checks),failures=failures,broken=broken,duplicates=duplicates,missing_alt=sum(p["missing_alt"] for p in records)),indent=2))
sys.exit(bool(failures or broken or any(duplicates.values())))
