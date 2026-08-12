"use client";

import { useEffect, useState } from "react";
import config from "@/config/restaurant";

const links = [
  { href: "#geschichte", label: "Geschichte" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#besuch", label: "Besuch" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bone/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className={`absolute inset-x-0 bottom-0 h-px transition-opacity ${scrolled ? "bg-ink/10 opacity-100" : "opacity-0"}`} />
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#" className="group flex items-center gap-3">
          <img
            src="/assets/logo-mark.png"
            alt={`${config.name} Logo`}
            className={`h-20 w-auto transition-all duration-500 md:h-28`}
          />
          <span className={`hidden font-display text-[18px] tracking-tight transition-colors duration-500 sm:block md:text-[20px] ${scrolled ? "text-ink" : "text-bone"}`}>
            {config.name}
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                scrolled ? "text-ink/65 hover:text-ink" : "text-bone/70 hover:text-bone"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-messing-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="/reservierung"
          className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-500 active:scale-[0.98] ${
            scrolled ? "border-ink text-ink" : "border-bone/50 text-bone"
          }`}
        >
          <span className="relative z-10 transition-colors group-hover:text-bone">
            Reservieren
          </span>
          <span className="relative z-10 transition-colors group-hover:text-bone">&rarr;</span>
          <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-wald-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </a>
      </nav>
    </header>
  );
}
