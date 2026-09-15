import fs from "node:fs";
// Phase 2 redirect test: fetches every old URL in movings-redirect-map.csv
// against a running local build and asserts it 301s to the mapped
// destination — plus the trailing-slash variant of each, and a probe of
// each retired namespace's catch-all. Run with the dev/prod server already
// listening (see BASE_URL below).
//
//   node scripts/test-redirects.mjs
//   BASE_URL=http://localhost:3100 node scripts/test-redirects.mjs

import {
  parseCsv,
  normalizePath,
  stripQuery,
  CATCH_ALL_PREFIXES,
} from "./redirect-map.mjs";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";

function toggleSlash(pathname) {
  if (pathname === "/") return null;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : `${pathname}/`;
}

async function check(requestPath, expect) {
  const url = new URL(requestPath, BASE_URL).toString();
  let res;
  try {
    res = await fetch(url, { redirect: "manual" });
  } catch (err) {
    return { ok: false, detail: `fetch error: ${err.message}` };
  }

  if (expect.type === "redirect") {
    const location = res.headers.get("location");
    const locationPath = location ? new URL(location, BASE_URL).pathname : null;
    const ok = res.status === 301 && locationPath === expect.destination;
    return {
      ok,
      detail: ok
        ? null
        : `status=${res.status} location=${location ?? "(none)"} (expected 301 -> ${expect.destination})`,
    };
  }

  const ok = res.status === 200;
  return { ok, detail: ok ? null : `status=${res.status} (expected 200)` };
}

async function main() {
  const imported = JSON.parse(
    fs.readFileSync(
      new URL("../content/blog-import.json", import.meta.url),
      "utf8",
    ),
  );
  const map = new Map(
    imported.map((p) => [normalizePath(p.originalPath), `/blog/${p.slug}`]),
  );
  const rows = parseCsv().map((row) => ({
    ...row,
    new_url: map.get(normalizePath(row.old_url)) || row.new_url,
  }));
  for (const p of imported)
    if (
      !rows.some(
        (r) => normalizePath(r.old_url) === normalizePath(p.originalPath),
      )
    )
      rows.push({ old_url: p.originalPath, new_url: `/blog/${p.slug}` });
  let pass = 0;
  const failures = [];

  for (const row of rows) {
    const newPath = row.new_url === "/" ? "/" : row.new_url.replace(/\/$/, "");
    const isSelf = stripQuery(row.old_url) === row.new_url;

    // 1. The literal URL as indexed by Search Console (query string and all).
    const literalExpect = isSelf
      ? { type: "ok" }
      : { type: "redirect", destination: newPath };
    const literal = await check(row.old_url, literalExpect);
    if (literal.ok) pass++;
    else failures.push(`${row.old_url} :: ${literal.detail}`);

    // 2. The opposite trailing-slash variant.
    const altPath = toggleSlash(stripQuery(row.old_url));
    if (altPath && !isSelf) {
      const alt = await check(
        altPath,
        altPath === newPath
          ? { type: "ok" }
          : { type: "redirect", destination: newPath },
      );
      if (alt.ok) pass++;
      else failures.push(`${altPath} (slash variant) :: ${alt.detail}`);
    }
  }

  // 3. Catch-all safety net for the three retired namespaces.
  for (const prefix of CATCH_ALL_PREFIXES) {
    const probe = `${prefix}/some-retired-page-not-in-the-map/`;
    const result = await check(probe, { type: "redirect", destination: "/" });
    if (result.ok) pass++;
    else failures.push(`${probe} (catch-all) :: ${result.detail}`);
  }

  // 4. Every unique destination must itself serve 200, not redirect. This
  // is what catches a self-redirect: e.g. an old URL that (once its slash
  // is stripped) is textually identical to its own destination, such as
  // /packing/ -> /packing, must not produce a rule for the bare /packing
  // path pointing at itself.
  const destinations = new Set(
    rows.map((row) =>
      row.new_url === "/" ? "/" : row.new_url.replace(/\/$/, ""),
    ),
  );
  for (const destination of destinations) {
    const result = await check(destination, { type: "ok" });
    if (result.ok) pass++;
    else failures.push(`${destination} (destination page) :: ${result.detail}`);
  }

  const total = pass + failures.length;
  console.log(
    `Redirect test against ${BASE_URL}: ${pass}/${total} checks passed.`,
  );
  if (failures.length) {
    console.log(`\n${failures.length} failure(s):`);
    for (const f of failures) console.log(`  - ${f}`);
  }
  process.exit(failures.length > 0 ? 1 : 0);
}

main();
