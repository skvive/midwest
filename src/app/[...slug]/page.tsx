import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allRoutes,
  getPage,
  siblings,
  SECTION_HERO,
  SECTION_LABELS,
  type Section,
} from "@/lib/content";
import { cleanSectionBlocks } from "@/lib/clean-blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return allRoutes().map((r) => ({ slug: r.split("/").filter(Boolean) }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const page = getPage("/" + params.slug.join("/"));
  return { title: page?.title ?? "Midwest University" };
}

function Blocks({ section }: { section: Section }) {
  const items: React.ReactNode[] = [];
  let list: string[] = [];
  let rows: string[] = [];
  const blocks = cleanSectionBlocks(section);

  const flushList = (key: string) => {
    if (list.length) {
      items.push(
        <ul key={"ul" + key} className="list-disc pl-5 space-y-1.5 text-brand-slate my-3">
          {list.map((x, i) => (
            <li key={i} className="leading-relaxed">
              {x}
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  const flushRows = (key: string) => {
    if (rows.length) {
      items.push(
        <div key={"tb" + key} className="my-4 border border-brand-line rounded-md divide-y divide-brand-line overflow-hidden">
          {rows.map((x, i) => (
            <div key={i} className={`px-4 py-2.5 text-sm leading-relaxed ${i % 2 ? "bg-white" : "bg-brand-paper"} text-brand-slate`}>
              {x}
            </div>
          ))}
        </div>
      );
      rows = [];
    }
  };

  blocks.forEach((b, i) => {
    if (b.t === "li") {
      flushRows(String(i));
      list.push(b.x);
    } else if (b.t === "row") {
      flushList(String(i));
      // Short rows as headings-ish labels
      if (b.x.length < 90 && /^(Dr\.|Mr\.|Ms\.|Prof\.)/i.test(b.x)) {
        flushRows(String(i));
        items.push(
          <h3 key={"h" + i} className="font-serif text-brand-navy text-lg mt-6 mb-2">
            {b.x}
          </h3>
        );
      } else {
        rows.push(b.x);
      }
    } else {
      flushList(String(i));
      flushRows(String(i));
      items.push(
        <p key={"p" + i} className="text-brand-slate my-3 leading-relaxed">
          {b.x}
        </p>
      );
    }
  });
  flushList("end");
  flushRows("end");
  return <>{items}</>;
}

export default function ContentPage({ params }: { params: { slug: string[] } }) {
  const route = "/" + params.slug.join("/");
  const page = getPage(route);
  if (!page) notFound();

  const top = params.slug[0];
  const hero = SECTION_HERO[top] ?? SECTION_HERO.about;
  const sectionLabel = SECTION_LABELS[top] ?? top;
  const sibs = siblings(route);

  return (
    <>
      {/* 섹션 히어로 */}
      <section
        className="relative flex items-end min-h-[15rem] lg:min-h-[19rem] bg-cover bg-center"
        style={{ backgroundImage: `url('${hero}')` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(11,26,50,.35), rgba(11,26,50,.78))" }}
        />
        <div className="wrap relative z-10 pb-8 text-white">
          <nav className="text-[0.8rem] opacity-85 mb-2" aria-label="breadcrumb">
            <Link href="/">Home</Link>
            {page.breadcrumb.slice(1).map((c, i) => (
              <span key={i}> &gt; {c}</span>
            ))}
          </nav>
          <h1 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            {page.title}
          </h1>
        </div>
      </section>

      <div className="wrap grid lg:grid-cols-[16rem_1fr] gap-10 py-10 lg:py-14">
        {/* 사이드 내비 */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-brand-line rounded-md overflow-hidden">
            <div className="bg-brand-navy text-white px-4 py-3 font-serif font-bold">{sectionLabel}</div>
            <ul className="max-h-[24rem] overflow-y-auto divide-y divide-brand-line/60">
              {sibs.slice(0, 40).map((s) => (
                <li key={s.route}>
                  <Link
                    href={s.route}
                    className={`block px-4 py-2.5 text-sm hover:bg-brand-paper ${
                      s.route === route ? "text-brand-navy font-bold bg-brand-paper" : "text-brand-slate"
                    }`}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 본문 */}
        <article>
          {page.sections.map((sec, i) => (
            <section key={i} className="mb-8">
              {sec.heading && (
                <h2
                  className={`font-serif text-brand-navy mb-2 ${
                    sec.level <= 3 ? "text-2xl" : sec.level === 4 ? "text-xl" : "text-lg"
                  }`}
                >
                  <span className="inline-block w-8 h-[3px] bg-brand-gold align-middle mr-3 mb-1" aria-hidden />
                  {sec.heading}
                </h2>
              )}
              <Blocks section={sec} />
            </section>
          ))}
          {page.sections.length === 0 && (
            <p className="text-brand-muted">
              이 페이지의 콘텐츠는 준비 중입니다. 원본:{" "}
              <a className="text-brand-gold" href={page.sourceUrl}>
                {page.sourceUrl}
              </a>
            </p>
          )}
        </article>
      </div>
    </>
  );
}
