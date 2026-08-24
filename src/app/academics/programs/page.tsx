import Link from "next/link";
import { pages } from "@/lib/content";
import { PROGRAM_LEVELS } from "@/lib/data";

export const metadata = { title: "Program Finder" };

const LEVEL_IMG: Record<string, string> = {
  esl: "/media/img/04student/03-11.jpg",
  bachelor: "/media/img/04student/03-14.jpg",
  master: "/media/img/04student/03-02.jpg",
  doctoral: "/media/img/01about/01school_1.jpg",
};

export default function ProgramFinder({ searchParams }: { searchParams: { level?: string } }) {
  const level = searchParams.level;
  const programs = Object.values(pages)
    .filter((p) => p.route.startsWith("/academics/programs/") && !p.route.endsWith("/index") && !p.route.endsWith("/index-school"))
    .map((p) => ({ ...p, level: p.route.split("/")[3] }))
    .filter((p) => PROGRAM_LEVELS.some((l) => l.key === p.level))
    .sort((a, b) => a.route.localeCompare(b.route));

  const filtered = level ? programs.filter((p) => p.level === level) : programs;

  return (
    <>
      <section
        className="relative flex items-end min-h-[15rem] lg:min-h-[19rem] bg-cover bg-center"
        style={{ backgroundImage: `url('/media/img/01about/01school_1.jpg')` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,26,50,.35), rgba(11,26,50,.78))" }} />
        <div className="wrap relative z-10 pb-8 text-white">
          <nav className="text-[0.8rem] opacity-85 mb-2">
            <Link href="/">Home</Link> &gt; Academics &gt; Program Finder
          </nav>
          <h1 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Program Finder
          </h1>
        </div>
      </section>

      <div className="wrap py-10 lg:py-14">
        {/* URL 쿼리 SSOT 필터 — 수평 스크롤 칩 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8" role="tablist" aria-label="학위 과정 필터">
          <Link
            href="/academics/programs"
            className={`btn shrink-0 ${!level ? "bg-brand-navy text-white" : "border border-brand-line text-brand-slate"}`}
          >
            All ({programs.length})
          </Link>
          {PROGRAM_LEVELS.map((l) => (
            <Link
              key={l.key}
              href={`/academics/programs?level=${l.key}`}
              className={`btn shrink-0 ${level === l.key ? "bg-brand-navy text-white" : "border border-brand-line text-brand-slate"}`}
            >
              {l.label} ({programs.filter((p) => p.level === l.key).length})
            </Link>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.route}
              href={p.route}
              className="flex bg-white border border-brand-line rounded-md overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span
                className="w-28 shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${LEVEL_IMG[p.level]}')` }}
              />
              <span className="p-4">
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-brand-gold">
                  {PROGRAM_LEVELS.find((l) => l.key === p.level)?.label}
                </span>
                <span className="block font-bold text-brand-navy leading-snug mt-0.5">{p.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
