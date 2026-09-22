import assert from "node:assert/strict";
import { responsiveImageAttributes } from "../src/lib/blog-image.ts";

const notion = "https://prod-files-secure.s3.us-west-2.amazonaws.com/example/photo.png?signature=abc";
const remote = responsiveImageAttributes(notion);
assert.ok(remote.src.startsWith("/_next/image?url="));
assert.match(remote.srcset, /640w.+828w.+1200w.+1600w/);
assert.equal(remote.sizes, "(max-width: 820px) calc(100vw - 40px), 780px");
assert.ok(!remote.src.includes("signature=abc"));
assert.ok(decodeURIComponent(remote.src).includes("signature=abc"));
assert.ok(responsiveImageAttributes("/images/blog/photo.webp").src);
assert.deepEqual(responsiveImageAttributes("https://example.com/photo.jpg"), {});
assert.deepEqual(responsiveImageAttributes("javascript:alert(1)"), {});
console.log("Blog image allowlist and responsive optimization attributes passed.");
