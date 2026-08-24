"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, localePath, ui } from "@/lib/i18n";

const COLS_EN = [
  {
    title: "Academics",
    items: [
      { label: "ESL / Certificate", href: "/academics/programs/esl/welcome" },
      { label: "Bachelor Programs", href: "/academics/programs/bachelor/general" },
      { label: "Master Programs", href: "/academics/programs/master/general" },
      { label: "Doctoral Programs", href: "/academics/programs/doctoral/general" },
      { label: "Academic Calendar", href: "/academics/calendar" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { label: "Requirements", href: "/admissions/requirements" },
      { label: "Tuition & Scholarships", href: "/admissions/tuition" },
      { label: "International (SEVIS·J-1)", href: "/admissions/sevis" },
      { label: "Admission FAQ", href: "/admissions/faq" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Library", href: "/library/about" },
      { label: "Official Bulletin", href: "/student-life/official-bulletin" },
      { label: "Sejong Institute", href: "/language-center/introduction" },
      { label: "MIRI Research", href: "/research/miri-program" },
      { label: "Alumni & Giving", href: "/alumni/general" },
    ],
  },
];

const COLS_KO = [
  {
    title: "학사",
    items: [
      { label: "ESL / 수료과정", href: "/academics/programs/esl/welcome" },
      { label: "학사 과정", href: "/academics/programs/bachelor/general" },
      { label: "석사 과정", href: "/academics/programs/master/general" },
      { label: "박사 과정", href: "/academics/programs/doctoral/general" },
      { label: "학사 일정", href: "/academics/calendar" },
    ],
  },
  {
    title: "입학",
    items: [
      { label: "지원 자격", href: "/admissions/requirements" },
      { label: "등록금·장학금", href: "/admissions/tuition" },
      { label: "국제학생 (SEVIS·J-1)", href: "/admissions/sevis" },
      { label: "입학 FAQ", href: "/admissions/faq" },
    ],
  },
  {
    title: "리소스",
    items: [
      { label: "도서관", href: "/library/about" },
      { label: "공지사항", href: "/student-life/official-bulletin" },
      { label: "세종학당", href: "/language-center/introduction" },
      { label: "MIRI 연구", href: "/research/miri-program" },
      { label: "동문·기부", href: "/alumni/general" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = ui[locale];
  const cols = locale === "ko" ? COLS_KO : COLS_EN;

  return (
    <footer className="bg-[#0e1726] text-[#c6cede] pt-14 pb-8 mt-auto">
      <div className="wrap grid gap-8 md:grid-cols-4">
        <div>
          <h4 className="text-white font-serif font-bold mb-3.5">Midwest University</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>851 Parr Rd, Wentzville, MO 63385</li>
            <li>(636) 327-4645</li>
            <li>usa@midwest.edu</li>
            <li>Seoul · Lima · Bangkok · Ho Chi Minh</li>
          </ul>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-semibold mb-3.5 text-[0.95rem]">{c.title}</h4>
            <ul className="space-y-2 text-sm">
              {c.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={localePath(it.href, locale)}
                    className="opacity-85 hover:opacity-100 hover:text-white"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap border-t border-[#2a3650] mt-10 pt-5 text-[0.82rem] opacity-70">
        {t.footerCopy}
      </div>
    </footer>
  );
}
