import { NextRequest, NextResponse } from "next/server";
import retiredSlugs from "../content/retired-blog-slugs.json";
const retired = new Set(["/movers-directory", "/60-movers-in-singapore", ...retiredSlugs.flatMap(s => [`/${s}`, `/blog/${s}`])]);
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (retired.has(path)) {
    return new NextResponse(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page removed | Moving Solutions</title><main style="max-width:42rem;margin:12vh auto;padding:24px;font:18px/1.6 system-ui;color:#163250"><h1>This directory has been retired</h1><p>This page is no longer published.</p><p><a href="/">Moving Solutions home</a> · <a href="/blog">Moving journal</a></p></main></html>`, {status: 410, headers: {"Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex"}});
  }
  const response = request.nextUrl.pathname.startsWith("/blog/") && request.nextUrl.pathname.endsWith("/")
    ? NextResponse.redirect(new URL(path + request.nextUrl.search, request.url), 301)
    : NextResponse.next();
  // The WordPress hostname remains the canonical production domain. Keep
  // Vercel aliases out of search before and after the domain cutover.
  if (request.nextUrl.hostname.endsWith(".vercel.app")) response.headers.set("X-Robots-Tag", "noindex, follow");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}
export const config = { matcher: ["/((?!_next/static|_next/image|images/|icon.png|apple-icon.png).*)"] };
