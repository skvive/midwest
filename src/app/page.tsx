import Link from "next/link";
import { posts } from "@/lib/data";

const HERO = "/media/img/04student/03-01_.jpg";
const PANO = "/media/img/01about/07-01campus.jpg";

const STORY = [
  {
    eyebrow: "Academics",
    title: "소수정예 강의실, 깊이 있는 배움",
    body: "학사 6개·석사 7개·박사 13개 학위과정과 ESL 프로그램. 교수와 학생이 가까이 마주하는 small-class 환경에서 대면·블렌디드·이러닝 방식을 자유롭게 선택할 수 있습니다.",
    href: "/academics/programs",
    link: "프로그램 파인더 →",
    img: "/media/img/07library/02-01LibraryBooks.jpg",
    alt: "Midwest University Library",
  },
  {
    eyebrow: "Global",
    title: "세인트루이스에서 세계로",
    body: "서울·리마·방콕·호치민 오피스가 유학 상담과 SEVIS·J-1 비자 절차를 지원합니다. 세종학당과 함께하는 한국어·문화 프로그램도 운영합니다.",
    href: "/admissions/sevis",
    link: "국제학생 안내 →",
    img: "/media/img/04student/03-05.jpg",
    alt: "Campus fountain",
  },
];

const PROGRAMS = [
  { no: "01", title: "ESL · Certificate", desc: "집중 영어 과정 · 세종학당 한국어", href: "/academics/programs/esl/welcome", img: "/media/img/04student/03-11.jpg" },
  { no: "02", title: "Bachelor's — 6 Programs", desc: "Business · Biblical Studies · Music · Aviation Mgmt", href: "/academics/programs/bachelor/general", img: "/media/img/04student/03-14.jpg" },
  { no: "03", title: "Master's — 7 Programs", desc: "MBA · Counseling · Education · TESOL · Divinity", href: "/academics/programs/master/general", img: "/media/img/04student/03-02.jpg" },
  { no: "04", title: "Doctoral — 13 Programs", desc: "DBA · Ph.D · D.Min · DMA · DFA", href: "/academics/programs/doctoral/general", img: "/media/img/01about/01school_1.jpg" },
];

const NEWS_IMG: Record<string, string> = {
  gallery: "/media/img/04student/03-05.jpg",
  miri: "/media/img/04student/03-15.jpg",
  bulletin: "/media/img/04student/03-06_.jpg",
};

export default function Home() {
  const latest = [...posts]
    .filter((p) => !p.deleted_at)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <>
      {/* Hero — 풀블리드 레이어드 */}
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
            <span className="eyebrow">Since 1986 · Wentzville, Missouri</span>
            <h1
              className="font-serif font-bold mt-4"
              style={{ fontSize: "clamp(2.4rem,5.6vw,4.2rem)", lineHeight: 1.18, textShadow: "0 2px 24px rgba(0,0,0,.35)" }}
            >
              Scholarship,
              <br />
              <span className="relative">
                anchored in purpose.
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
              미드웨스트대학교는 성경적 세계관 위에 세워진 고등교육기관으로, 학문적 엄격함과 인격적
              돌봄을 통해 사역과 전문 분야 모두에서의 성공을 준비시킵니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/admissions/requirements" className="btn bg-white text-brand-navy">
                Apply Online
              </Link>
              <Link
                href="/student-life/campus-tour"
                className="btn text-white border border-white/50 bg-white/10 backdrop-blur-sm"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
        {/* 글래스 팩트카드 */}
        <div className="hidden md:flex absolute right-10 bottom-10 z-10 gap-6 rounded-md bg-white/90 backdrop-blur px-6 py-4 shadow-2xl">
          {[
            ["40+", "YEARS"],
            ["27", "PROGRAMS"],
            ["5", "GLOBAL OFFICES"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <strong className="font-serif text-2xl text-brand-navy block">{n}</strong>
              <span className="text-[0.72rem] tracking-wider text-brand-muted">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
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
            MISSION &amp; PURPOSE STATEMENT
          </cite>
        </div>
      </section>

      {/* Story blocks */}
      {STORY.map((s, i) => (
        <section key={s.title} className="py-14 lg:py-20">
          <div className={`wrap grid gap-10 lg:gap-16 items-center md:grid-cols-2`}>
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

      {/* Campus Life — 포토 모자이크 (시안 B 이미지 밀도) */}
      <section className="pb-14 lg:pb-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="font-serif text-brand-navy" style={{ fontSize: "clamp(1.6rem,3.2vw,2.3rem)" }}>
              Campus Life
            </h2>
            <Link href="/student-life/campus-tour" className="text-brand-gold font-bold text-sm">
              캠퍼스 투어 →
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

      {/* Degrees & Programs */}
      <section className="bg-brand-paper border-y border-brand-line py-14 lg:py-18">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="font-serif text-brand-navy" style={{ fontSize: "clamp(1.6rem,3.2vw,2.3rem)" }}>
              Degrees &amp; Programs
            </h2>
            <Link href="/academics/programs" className="text-brand-gold font-bold text-sm">
              전체 프로그램 →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {PROGRAMS.map((p) => (
              <Link
                key={p.no}
                href={p.href}
                className="flex bg-white border border-brand-line rounded-md overflow-hidden card-lift"
              >
                <span
                  className="w-[9.5rem] shrink-0 bg-cover bg-center min-h-[7.5rem]"
                  style={{ backgroundImage: `url('${p.img}')` }}
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

      {/* News */}
      <section className="py-14 lg:py-18">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="font-serif text-brand-navy" style={{ fontSize: "clamp(1.6rem,3.2vw,2.3rem)" }}>
              News &amp; Announcements
            </h2>
            <Link href="/student-life/official-bulletin" className="text-brand-gold font-bold text-sm">
              전체 소식 →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p) => (
              <Link
                key={p.id}
                href={`${p.board === "miri" ? "/research/miri-news" : p.board === "gallery" ? "/student-life/gallery-news" : "/student-life/official-bulletin"}/${p.id}`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-navy2 text-white py-12 lg:py-14">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["40+", "Years of Heritage"],
            ["27", "Degree Programs"],
            ["5", "Global Offices"],
            ["1:8", "Small-Class Ratio"],
          ].map(([n, l]) => (
            <div key={l}>
              <strong className="font-serif block text-brand-goldsoft" style={{ fontSize: "clamp(1.9rem,4vw,2.7rem)" }}>
                {n}
              </strong>
              <span className="opacity-80 text-sm">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visit band */}
      <section
        className="relative text-white text-center py-20 lg:py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(18,43,82,.55), rgba(18,43,82,.8)), url('${PANO}')`,
        }}
      >
        <div className="wrap">
          <h2 className="font-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.6rem)" }}>
            Visit our St. Louis campus.
          </h2>
          <p className="opacity-90 max-w-[40rem] mx-auto mt-3 mb-6">
            851 Parr Rd, Wentzville — 캠퍼스 투어와 입학 상담을 환영합니다. 서울 사이트에서도 상담이
            가능합니다.
          </p>
          <Link href="/student-life/campus-tour" className="btn bg-white text-brand-navy">
            Campus Tour 신청
          </Link>
        </div>
      </section>
    </>
  );
}
