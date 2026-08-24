import Link from "next/link";
import facultyData from "@/lib/faculty-data.json";
import { NAV } from "@/lib/nav";

type Faculty = {
  name: string;
  degree: string;
  field: string;
  education: string[];
  experience: string[];
  department: string;
};

const faculty = facultyData as Faculty[];

const DEPT_ORDER = [
  "ESL & TESOL",
  "School of Aviation",
  "School of Business and Leadership",
  "School of Culture and Arts",
  "School of Music",
  "School of Education",
  "School of Counseling Psychology",
  "School of Theology",
];

const academicNav = NAV.find((g) => g.label === "Academics")?.items ?? [];

export const metadata = {
  title: "Faculty",
  description: "Midwest University faculty directory by school and program.",
};

function groupByDept(list: Faculty[]) {
  const map = new Map<string, Faculty[]>();
  for (const f of list) {
    const arr = map.get(f.department) ?? [];
    arr.push(f);
    map.set(f.department, arr);
  }
  const ordered: { dept: string; people: Faculty[] }[] = [];
  for (const d of DEPT_ORDER) {
    const people = map.get(d);
    if (people?.length) {
      ordered.push({
        dept: d,
        people: [...people].sort((a, b) => a.name.localeCompare(b.name)),
      });
      map.delete(d);
    }
  }
  for (const [dept, people] of Array.from(map.entries())) {
    ordered.push({
      dept,
      people: [...people].sort((a, b) => a.name.localeCompare(b.name)),
    });
  }
  return ordered;
}

export default function FacultyPage() {
  const groups = groupByDept(faculty);

  return (
    <>
      <section
        className="relative flex items-end min-h-[15rem] lg:min-h-[19rem] bg-cover bg-center"
        style={{ backgroundImage: "url('/media/img/01about/01school_1.jpg')" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(11,26,50,.35), rgba(11,26,50,.78))" }}
        />
        <div className="wrap relative z-10 pb-8 text-white">
          <nav className="text-[0.8rem] opacity-85 mb-2" aria-label="breadcrumb">
            <Link href="/">Home</Link>
            <span> &gt; Academics</span>
            <span> &gt; Faculty</span>
          </nav>
          <h1 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Faculty
          </h1>
          <p className="mt-2 max-w-xl text-white/85 text-sm md:text-base">
            Distinguished scholars and practitioners across Midwest University schools.
          </p>
        </div>
      </section>

      <div className="wrap grid lg:grid-cols-[15rem_1fr] gap-10 py-10 lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-brand-line rounded-md overflow-hidden">
            <div className="bg-brand-navy text-white px-4 py-3 font-serif font-bold">Academics</div>
            <ul className="divide-y divide-brand-line/60">
              {academicNav.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={`block px-4 py-2.5 text-sm hover:bg-brand-paper ${
                      s.href === "/academics/faculty"
                        ? "text-brand-navy font-bold bg-brand-paper"
                        : "text-brand-slate"
                    }`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-brand-line bg-brand-paper px-4 py-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-muted mb-2">
                Jump to school
              </p>
              <ul className="space-y-1.5">
                {groups.map((g) => (
                  <li key={g.dept}>
                    <a
                      href={`#${slugify(g.dept)}`}
                      className="text-sm text-brand-slate hover:text-brand-navy"
                    >
                      {g.dept.replace(/^School of /, "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <article>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <p className="text-brand-slate max-w-2xl">
              {faculty.length} faculty members across {groups.length} schools and programs.
            </p>
            <nav className="flex flex-wrap gap-2 lg:hidden" aria-label="Schools">
              {groups.map((g) => (
                <a
                  key={g.dept}
                  href={`#${slugify(g.dept)}`}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded border border-brand-line text-brand-navy bg-brand-paper"
                >
                  {g.dept.replace(/^School of /, "")}
                </a>
              ))}
            </nav>
          </div>

          {groups.map((g) => (
            <section key={g.dept} id={slugify(g.dept)} className="mb-12 scroll-mt-28">
              <header className="mb-5 flex items-baseline justify-between gap-3 border-b border-brand-line pb-3">
                <h2 className="font-serif text-brand-navy text-2xl">
                  <span className="inline-block w-8 h-[3px] bg-brand-gold align-middle mr-3 mb-1" aria-hidden />
                  {g.dept}
                </h2>
                <span className="text-sm text-brand-muted shrink-0">{g.people.length}</span>
              </header>

              <div className="grid gap-4 sm:grid-cols-2">
                {g.people.map((p) => (
                  <article
                    key={`${g.dept}-${p.name}`}
                    className="border border-brand-line rounded-md bg-white p-5 flex flex-col"
                  >
                    <h3 className="font-serif text-lg text-brand-navy leading-snug">
                      {p.name}
                      <span className="text-brand-gold font-sans text-sm font-bold ml-2">
                        {formatDegree(p.degree)}
                      </span>
                    </h3>
                    {p.field && (
                      <p className="mt-1 text-sm font-semibold text-brand-slate">{p.field}</p>
                    )}

                    {p.education.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-brand-slate">
                        {p.education.map((ed, i) => (
                          <li key={i} className="leading-snug pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-brand-gold">
                            {ed}
                          </li>
                        ))}
                      </ul>
                    )}

                    {p.experience.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-brand-line/80">
                        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                          Experience
                        </p>
                        <ul className="space-y-1.5 text-sm text-brand-muted">
                          {p.experience.map((ex, i) => (
                            <li key={i} className="leading-snug pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-brand-gold">
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDegree(d: string) {
  if (!d) return "";
  // M.A -> M.A. ; Ph.D -> Ph.D. ; D.Min -> D.Min.
  if (/[a-z]$/i.test(d) && !d.endsWith(".")) return `${d}.`;
  return d;
}
