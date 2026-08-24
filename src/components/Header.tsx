"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DataModeToggle from "./DataModeToggle";
import LanguageToggle from "./LanguageToggle";
import {
  getLocaleFromPath,
  localePath,
  localizedAudiences,
  localizedNav,
  ui,
} from "@/lib/i18n";

const POPULI_APPLY = "https://www.midwest.edu/eng/03admissions/05apply/index.asp";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = ui[locale];
  const nav = localizedNav(locale);
  const audiences = localizedAudiences(locale);
  const homeHref = localePath("/", locale);

  useEffect(() => {
    document.documentElement.lang = locale === "ko" ? "ko" : "en";
  }, [locale]);

  return (
    <>
      <div className="h-1 bg-brand-navy" />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-brand-line">
        <div className="wrap flex items-center gap-3 lg:gap-4 py-3.5">
          <Link href={homeHref} className="flex items-center gap-2.5 font-serif font-bold text-xl text-brand-navy shrink-0 group">
            <span
              aria-hidden
              className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-brand-navy text-brand-goldsoft text-sm font-bold transition group-hover:bg-brand-navy2"
            >
              MU
            </span>
            <span className="hidden sm:inline leading-tight">
              Midwest
              <span className="block text-[0.62rem] tracking-[0.22em] uppercase text-brand-muted font-sans font-semibold">
                University
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden lg:flex items-center gap-1">
            {nav.map((g) => (
              <div key={g.label} className="relative group">
                <Link
                  href={g.href}
                  className="px-2.5 py-2 text-[0.9rem] font-semibold text-[#3d4a63] hover:text-brand-navy"
                >
                  {g.label}
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block pt-1">
                  <ul className="min-w-[15rem] bg-white border border-brand-line rounded-md shadow-xl py-2">
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          className="block px-4 py-2 text-sm text-brand-slate hover:bg-brand-paper hover:text-brand-navy"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>

          <div className="ml-auto lg:ml-2 flex items-center gap-2">
            <LanguageToggle />
            <DataModeToggle />
            <a
              href={POPULI_APPLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-brand-navy text-white hover:bg-brand-navy2"
            >
              {t.apply}
            </a>
            <button
              aria-label={t.openMenu}
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-brand-line"
            >
              <span aria-hidden>☰</span>
            </button>
          </div>
        </div>

        <div className="hidden md:block bg-brand-paper border-t border-brand-line">
          <div className="wrap flex flex-wrap gap-x-7 gap-y-1 py-2 text-[0.85rem] text-[#6b6a63]">
            <span>{t.informationFor}</span>
            {audiences.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="hover:text-brand-navy font-medium first-of-type:font-bold first-of-type:text-brand-navy"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-brand-navy text-white overflow-y-auto">
          <div className="wrap py-4 flex items-center justify-between gap-3">
            <span className="font-serif font-bold text-lg">Midwest University</span>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button
                aria-label={t.closeMenu}
                onClick={() => setOpen(false)}
                className="w-11 h-11 rounded-md border border-white/30"
              >
                ✕
              </button>
            </div>
          </div>
          <nav className="wrap pb-10">
            {nav.map((g) => (
              <details key={g.label} className="border-b border-white/15 py-1">
                <summary className="py-3 font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                  {g.label} <span className="text-brand-goldsoft">＋</span>
                </summary>
                <ul className="pb-3">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 pl-3 text-white/80 hover:text-white"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <a
              href={POPULI_APPLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn bg-white text-brand-navy mt-6 w-full"
            >
              {t.applyOnline}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
