import endowedData from "@/lib/endowed-data.json";
import { AcademicAside, PageHero, ProfileCard } from "@/components/PageChrome";

type Person = { name: string; education: string[]; roles: string[] };
const people = endowedData as Person[];

export const metadata = {
  title: "Endowed Chair Professors",
  description: "Endowed chair professors at Midwest University.",
};

export default function EndowedChairPage() {
  return (
    <>
      <PageHero
        title="Endowed Chair Professors"
        crumb={["Academics", "Endowed Chair Professors"]}
        blurb="Distinguished chairs who advance scholarship and global leadership."
      />
      <div className="wrap grid lg:grid-cols-[15rem_1fr] gap-10 py-10 lg:py-14">
        <AcademicAside active="/academics/endowed-chair-professors" />
        <article>
          <p className="text-brand-slate mb-7">{people.length} endowed chair professors</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {people.map((p) => (
              <ProfileCard key={p.name} name={p.name} education={p.education} roles={p.roles} />
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
