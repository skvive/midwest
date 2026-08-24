import Link from "next/link";
import adminData from "@/lib/admin-data.json";
import { PageHero } from "@/components/PageChrome";
import { NAV } from "@/lib/nav";

type Item = { title: string; name: string; emails: string[] };
type Section = { heading: string; items: Item[] };
const sections = adminData as Section[];
const aboutNav = NAV.find((g) => g.label === "About")?.items ?? [];

export const metadata = {
  title: "Administration & Staff",
  description: "Midwest University administration and staff directory.",
};

export default function AdministrationPage() {
  return (
    <>
      <PageHero
        title="Administration & Staff"
        crumb={["About", "Administration & Staff"]}
        blurb="Leadership and campus offices serving the Midwest University community."
        image="/media/img/01about/07-01campus.jpg"
      />
      <div className="wrap grid lg:grid-cols-[15rem_1fr] gap-10 py-10 lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-brand-line rounded-md overflow-hidden">
            <div className="bg-brand-navy text-white px-4 py-3 font-serif font-bold">About</div>
            <ul className="divide-y divide-brand-line/60">
              {aboutNav.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={`block px-4 py-2.5 text-sm hover:bg-brand-paper ${
                      s.href === "/about/administration"
                        ? "text-brand-navy font-bold bg-brand-paper"
                        : "text-brand-slate"
                    }`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="space-y-10">
          {sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="font-serif text-brand-navy text-2xl mb-5">
                <span className="inline-block w-8 h-[3px] bg-brand-gold align-middle mr-3 mb-1" aria-hidden />
                {sec.heading}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {sec.items.map((it, i) => (
                  <div
                    key={`${sec.heading}-${i}`}
                    className="border border-brand-line rounded-md bg-white px-4 py-3.5"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">{it.title}</p>
                    {it.name && (
                      <p className="font-serif text-brand-navy mt-1 leading-snug">{it.name}</p>
                    )}
                    {it.emails?.length > 0 && (
                      <ul className="mt-2 space-y-0.5">
                        {it.emails.map((e) => (
                          <li key={e}>
                            <a href={`mailto:${e}`} className="text-sm text-brand-slate hover:text-brand-navy">
                              {e}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
