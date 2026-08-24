import Link from "next/link";
import { posts } from "@/lib/data";
import { localePath, ui, type Locale } from "@/lib/i18n";

const HERO = "/media/img/04student/03-01_.jpg";
const PANO = "/media/img/01about/07-01campus.jpg";

const PROGRAM_HREFS = [
  "/academics/programs/esl/welcome",
  "/academics/programs/bachelor/general",
  "/academics/programs/master/general",
  "/academics/programs/doctoral/general",
] as const;

const PROGRAM_IMGS = [
  "/media/img/04student/03-11.jpg",
  "/media/img/04student/03-14.jpg",
  "/media/img/04student/03-02.jpg",
  "/media/img/01about/01school_1.jpg",
] as const;

const NEWS_IMG: Record<string, string> = {
  gallery: "/media/img/04student/03-05.jpg",
  miri: "/media/img/04student/03-15.jpg",
  bulletin: "/media/img/04student/03-06_.jpg",
};

export default function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const latest = [...posts]
    .filter((p) => !p.deleted_at)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const story = [
    {
      eyebrow: t.story1Eyebrow,
      title: t.story1Title,
      body: t.story1Body,
      href: localePath("/academics/programs", locale),
      link: t.story1Link,
      img: "/media/img/07library/02-01LibraryBooks.jpg",
      alt: "Midwest University Library",
    },
    {
      eyebrow: t.story2Eyebrow,
      title: t.story2Title,
      body: t.story2Body,
      href: localePath("/admissions/sevis", locale),
      link: t.story2Link,
      img: "/media/img/04student/03-05.jpg",
      alt: "Campus fountain",
    },
  ];

  return (
    <>
      <section
        className="relative flex items-center overflow-hidden min-h-[min(92vh,52rem)] bg-cover"
        style={{ backgroundImage: `url('${HERO}')`, backgroundPosition: "center 35%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(11,26,50,.88) 0%, rgba(14,33,63,.62) 42%, rgba(18,43,82,.18) 72%, rgba(18,43,82,.05) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[38%]"
          style={{ background: "linear-gradient(180deg, transparent, rgba(9,20,38,.55))" }}
        />
        <div className="wrap relative z-10 py-24 lg:py-28">
          <div className="max-w-[38rem] text-white">
            <span className="eyebrow">{t.heroEyebrow}</span>
            <h1
              className="font-serif font-bold mt-4"
              style={{ fontSize: "clamp(2.4rem,5.6vw,4.2rem)", lineHeight: 1.18, textShadow: "0 2px 24px rgba(0,0,0,.35)" }}
            >
              {t.heroTitle1}
              <br />
              <span className="relative">
                {t.heroTitle2}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 rounded-sm -z-10"
                  style={{ bottom: "0.08em", height: "0.34em", background: "rgba(185,138,47,.38)" }}
                />
              </span>
            </h1>
            <p
              className="mt-6 mb-8 max-w-[31rem] text-[#e8edf6] border-l-2 pl-4"
              style={{ borderColor: "rgba(232,200,122,.6)", fontSize: "clamp(.98rem,1.5vw,1.1rem)" }}
            >
              {t.heroBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.midwest.edu/eng/03admissions/05apply/index.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-brand-navy"
              >
                {t.applyOnline}
              </a>
              <Link
                href={localePath("/student-life/campus-tour", locale)}
                className="btn text-white border border-white/50 bg-white/10 backdrop-blur-sm"
              >
                {t.visitUs}
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:flex absolute right-10 bottom-10 z-10 gap-6 rounded-md bg-white/90 backdrop-blur px-6 py-4 shadow-2xl">
          {[
            ["40+", t.factLabels[0]],
            ["27", t.factLabels[1]],
            ["5", t.factLabels[2]],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <strong className="font-serif text-2xl text-brand-navy block">{n}</strong>
              <span className="text-[0.72rem] tracking-wider text-brand-muted">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-paper border-b border-brand-line py-14 lg:py-16 text-center">
        <div className="wrap">
          <blockquote
            className="font-serif text-[#20355c] mx-auto max-w-[52rem]"
            style={{ fontSize: "clamp(1.2rem,2.4vw,1.65rem)", lineHeight: 1.5 }}
          >
            &ldquo;Midwest University exists to provide men and women with a biblically-based higher
            education designed to prepare them for success in their careers.&rdquo;
          </blockquote>
          <cite className="not-italic block mt-4 text-brand-gold font-bold text-sm tracking-widest">
            {t.missionCite}
          </cite>
        </div>
      </section>

      {story.map((s, i) => (
        <section key={s.title} className="py-14 lg:py-20">
          <div className="wrap grid gap-10 lg:gap-16 items-center md:grid-cols-2">
            <img
              src={s.img}
              alt={s.alt}
              className={`rounded-md w-full aspect-[4/3] object-cover ${i % 2 ? "md:order-2" : ""}`}
              style={{ boxShadow: "0.9rem 0.9rem 0 #ece6d8" }}
            />
            <div>
              <span className="eyebrow eyebrow--onlight">{s.eyebrow}</span>
              <h2 className="font-serif text-brand-navy mt-3 mb-4" style={{ fontSize: "clamp(1.6rem,3.2vw,2.35rem)" }}>
                {s.title}
              </h2>
              <p className="text-brand-slate mb-5">{s.body}</p>
              <Link href={s.href} className="text-brand-gold font-bold">
                {s.link}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="pb-14 lg:pb-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="font-serif text-brand-navy" style={{ fontSize: "clamp(1.6rem,3.2vw,2.3rem)" }}>
              {t.campusLife}
            </h2>
            <Link href={localePath("/student-life/campus-tour", locale)} className="text-brand-gold font-bold text-sm">
              {t.campusTourLink}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:[grid-auto-rows:11rem]">
            {[
              ["/media/img/04student/03-02.jpg", "md:col-span-2 md:row-span-2"],
              ["/media/img/04student/03-11.jpg", ""],
              ["/media/img/04student/03-14.jpg", ""],
              ["/media/img/04student/03-15.jpg", ""],
              ["/media/img/07library/02-01LibraryBooks.jpg", ""],
              ["/media/img/04student/03-06_.jpg", "md:col-span-2"],
              ["/media/img/04student/03-08.jpg", ""],
              ["/media/img/04student/03-12.jpg", ""],
            ].map(([src, cls]) => (
              <div
                key={src}
                className={`rounded-md bg-cover bg-center min-h-[8rem] ${cls}`}
                style={{ backgroundImage: `url('${src}')` }}
                role="img"
                aria-label="Midwest University campus"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper border-y border-brand-line py-14 lg:py-18">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="font-serif text-brand-navy" style={{ fontSize: "clamp(1.6rem,3.2vw,2.3rem)" }}>
              {t.degrees}
            </h2>
            <Link href={localePath("/academics/programs", locale)} className="text-brand-gold font-bold text-sm">
              {t.allPrograms}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {t.programs.map((p, idx) => (
              <Link
                key={p.no}
                href={localePath(PROGRAM_HREFS[idx], locale)}
                className="flex bg-white border border-brand-line rounded-md overflow-hidden card-lift"
              >
                <span
                  className="w-[9.5rem] shrink-0 bg-cover bg-center min-h-[7.5rem]"
                  style={{ backgroundImage: `url('${PROGRAM_IMGS[idx]}')` }}
                />
                <span className="p-4">
                  <span className="font-serif text-brand-gold text-sm">{p.no}</span>
                  <span className="block font-bold text-brand-navy mt-0.5">{p.title}</span>
                  <span className="block text-sm text-brand-muted mt-1">{p.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="font-serif text-brand-navy" style={{ fontSize: "clamp(1.6rem,3.2vw,2.3rem)" }}>
              {t.news}
            </h2>
            <Link href={localePath("/student-life/official-bulletin", locale)} className="text-brand-gold font-bold text-sm">
              {t.allNews}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p) => {
              const base =
                p.board === "miri"
                  ? "/research/miri-news"
                  : p.board === "gallery"
                    ? "/student-life/gallery-news"
                    : "/student-life/official-bulletin";
              return (
                <Link
                  key={p.id}
                  href={localePath(`${base}/${p.id}`, locale)}
                  className="bg-white border border-brand-line rounded-md overflow-hidden card-lift"
                >
                  <span
                    className="block aspect-video bg-cover bg-center border-b-[3px] border-brand-navy"
                    style={{ backgroundImage: `url('${p.image ?? NEWS_IMG[p.board]}')` }}
                  />
                  <span className="block p-4">
                    <span className="text-[0.75rem] font-bold uppercase tracking-wider text-brand-gold">
                      {p.board === "miri" ? "MIRI News" : p.board === "gallery" ? "Gallery News" : "Bulletin"}
                    </span>
                    <span className="block font-serif font-bold text-brand-navy mt-1 leading-snug">{p.title}</span>
                    <span className="block text-xs text-brand-muted mt-2">{p.date}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy2 text-white py-12 lg:py-14">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.stats.map(([n, l]) => (
            <div key={l}>
              <strong className="font-serif block text-brand-goldsoft" style={{ fontSize: "clamp(1.9rem,4vw,2.7rem)" }}>
                {n}
              </strong>
              <span className="opacity-80 text-sm">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="relative text-white text-center py-20 lg:py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(18,43,82,.55), rgba(18,43,82,.8)), url('${PANO}')`,
        }}
      >
        <div className="wrap">
          <h2 className="font-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.6rem)" }}>
            {t.visitTitle}
          </h2>
          <p className="opacity-90 max-w-[40rem] mx-auto mt-3 mb-6">{t.visitBody}</p>
          <Link href={localePath("/student-life/campus-tour", locale)} className="btn bg-white text-brand-navy">
            {t.campusTourCta}
          </Link>
        </div>
      </section>
    </>
  );
}
