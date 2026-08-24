import Link from "next/link";
import { NAV } from "@/lib/nav";

const academicNav = NAV.find((g) => g.label === "Academics")?.items ?? [];

export function PageHero({
  title,
  crumb,
  blurb,
  image = "/media/img/01about/01school_1.jpg",
}: {
  title: string;
  crumb: string[];
  blurb?: string;
  image?: string;
}) {
  return (
    <section
      className="relative flex items-end min-h-[15rem] lg:min-h-[19rem] bg-cover bg-center"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(11,26,50,.35), rgba(11,26,50,.78))" }}
      />
      <div className="wrap relative z-10 pb-8 text-white">
        <nav className="text-[0.8rem] opacity-85 mb-2" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          {crumb.map((c) => (
            <span key={c}> &gt; {c}</span>
          ))}
        </nav>
        <h1 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
          {title}
        </h1>
        {blurb && <p className="mt-2 max-w-xl text-white/85 text-sm md:text-base">{blurb}</p>}
      </div>
    </section>
  );
}

export function AcademicAside({ active }: { active: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 border border-brand-line rounded-md overflow-hidden">
        <div className="bg-brand-navy text-white px-4 py-3 font-serif font-bold">Academics</div>
        <ul className="divide-y divide-brand-line/60">
          {academicNav.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className={`block px-4 py-2.5 text-sm hover:bg-brand-paper ${
                  s.href === active ? "text-brand-navy font-bold bg-brand-paper" : "text-brand-slate"
                }`}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function ProfileCard({
  name,
  subtitle,
  education,
  roles,
}: {
  name: string;
  subtitle?: string;
  education?: string[];
  roles?: string[];
}) {
  return (
    <article className="border border-brand-line rounded-md bg-white p-5 h-full flex flex-col">
      <h3 className="font-serif text-lg text-brand-navy leading-snug">{name}</h3>
      {subtitle && <p className="mt-1 text-sm font-semibold text-brand-slate">{subtitle}</p>}
      {education && education.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-brand-slate">
          {education.map((ed, i) => (
            <li key={i} className="flex gap-2 leading-snug">
              <span className="text-brand-gold shrink-0" aria-hidden>
                ·
              </span>
              <span>{ed}</span>
            </li>
          ))}
        </ul>
      )}
      {roles && roles.length > 0 && (
        <div className="mt-3 pt-3 border-t border-brand-line/80">
          <p className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
            Experience
          </p>
          <ul className="space-y-1.5 text-sm text-brand-muted">
            {roles.map((r, i) => (
              <li key={i} className="flex gap-2 leading-snug">
                <span className="text-brand-gold shrink-0" aria-hidden>
                  ·
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
