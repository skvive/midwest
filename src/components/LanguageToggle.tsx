"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, switchLocalePath } from "@/lib/i18n";

export default function LanguageToggle() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-brand-line bg-white px-1 py-1 text-[0.72rem] font-bold tracking-wide"
      role="group"
      aria-label="Language"
    >
      <Link
        href={switchLocalePath(pathname, "en")}
        className={`px-2.5 py-1 rounded-full transition ${
          locale === "en" ? "bg-brand-navy text-white" : "text-brand-muted hover:text-brand-navy"
        }`}
        hrefLang="en"
      >
        ENGLISH
      </Link>
      <Link
        href={switchLocalePath(pathname, "ko")}
        className={`px-2.5 py-1 rounded-full transition ${
          locale === "ko" ? "bg-brand-navy text-white" : "text-brand-muted hover:text-brand-navy"
        }`}
        hrefLang="ko"
      >
        KOREA
      </Link>
    </div>
  );
}
