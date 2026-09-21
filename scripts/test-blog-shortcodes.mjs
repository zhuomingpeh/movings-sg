import assert from 'node:assert/strict';
import { parseBlogBlocks } from '../src/lib/blog-shortcodes.ts';
import sanitizeHtml from 'sanitize-html';

const parse = (text) => parseBlogBlocks(text, sanitizeHtml);
assert.deepEqual(parse('[contact]\n\n[reviews]\n\n[contact-form]').map(b => b.type), ['contact', 'reviews', 'contact-form']);
assert.deepEqual(parse(String.raw`\[contact\]`).map(b => b.type), ['contact']);
for (const input of ['`[contact]`', '```\n[reviews]\n```', '> [reviews]', '- [contact]', '## [reviews]', 'Text [contact]', '[unknown]', '[reviews](https://example.com)', '<div>[reviews]</div>']) {
  assert.ok(parse(input).every(b => b.type === 'html'), input);
}
const refs = parse('[example][ref]\n\n[contact]\n\n[example][ref]\n\n[ref]: https://example.com');
assert.equal(refs.filter(b => b.type === 'html' && b.html.includes('href="https://example.com"')).length, 2);
assert.ok(!JSON.stringify(parse('<script>alert(1)</script>\n\n[contact]\n\n<a href="javascript:alert(1)">bad</a>')).includes('alert(1)'));
assert.deepEqual(parse(''), []);
const legacy = '```javascript\nEXCELLENT\n\nBased on 137 reviews\n\nTrustindex verifies that the original source of the review is Google.\nOld review\n```';
const repaired = parse('Before\n\n' + legacy + '\n\nAfter\n\n[reviews]');
assert.equal(repaired.filter(b => b.type === 'reviews').length, 1);
assert.ok(!JSON.stringify(repaired).includes('Old review'));
assert.ok(JSON.stringify(repaired).includes('Before') && JSON.stringify(repaired).includes('After'));
assert.equal(parse('```\nEXCELLENT\nBased on 137 reviews\n```')[0].type, 'html');
console.log('Shortcode parsing, reference links, literal examples and sanitization checks passed.');
