import Link from "next/link";

const COLS: { title: string; items: { label: string; href: string }[] }[] = [
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

export default function Footer() {
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
        {COLS.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-semibold mb-3.5 text-[0.95rem]">{c.title}</h4>
            <ul className="space-y-2 text-sm">
              {c.items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="opacity-85 hover:opacity-100 hover:text-white">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap border-t border-[#2a3650] mt-10 pt-5 text-[0.82rem] opacity-70">
        © 2026 Midwest University · Facebook · Instagram · YouTube · Staff Login
      </div>
    </footer>
  );
}
