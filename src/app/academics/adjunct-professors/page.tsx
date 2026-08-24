import adjunctData from "@/lib/adjunct-data.json";
import { AcademicAside, PageHero, ProfileCard } from "@/components/PageChrome";

type Person = { name: string; education: string[]; roles: string[] };
const people = adjunctData as Person[];

export const metadata = {
  title: "Adjunct Professors",
  description: "Adjunct professors at Midwest University.",
};

export default function AdjunctProfessorsPage() {
  return (
    <>
      <PageHero
        title="Adjunct Professors"
        crumb={["Academics", "Adjunct Professors"]}
        blurb="Industry leaders and scholars who teach and mentor Midwest students."
      />
      <div className="wrap grid lg:grid-cols-[15rem_1fr] gap-10 py-10 lg:py-14">
        <AcademicAside active="/academics/adjunct-professors" />
        <article>
          <p className="text-brand-slate mb-7">{people.length} adjunct professors</p>
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
