"use client";
import Link from "next/link";
import { useRef } from "react";
export default function MobileMenu({links}: {links: string[][]}) {
  const menu = useRef<HTMLDetailsElement>(null);
  return <details className="mobile-menu" ref={menu} onKeyDown={e => {if(e.key === "Escape" && menu.current) {menu.current.open = false; menu.current.querySelector("summary")?.focus();}}}>
    <summary>Menu</summary>
    <nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link href={href} key={href} onClick={() => {if(menu.current) menu.current.open = false;}}>{label}</Link>)}</nav>
  </details>;
}
