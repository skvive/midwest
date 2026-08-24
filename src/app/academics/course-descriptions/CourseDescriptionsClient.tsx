"use client";

import { useMemo, useState } from "react";
import coursesData from "@/lib/courses-data.json";
import { AcademicAside, PageHero } from "@/components/PageChrome";

type Course = { code: string; number: string; title: string; credits: string; body: string };
type Group = { type: string; heading: string; courses: Course[]; toc: string[] };

const groups = coursesData as Group[];
const courseGroups = groups.filter((g) => g.type === "courses");

export default function CourseDescriptionsClient() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(courseGroups[0]?.heading ?? "");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return courseGroups
      .map((g) => ({
        ...g,
        courses: query
          ? g.courses.filter((c) =>
              `${c.code} ${c.number} ${c.title} ${c.body}`.toLowerCase().includes(query)
            )
          : g.courses,
      }))
      .filter((g) => g.courses.length > 0);
  }, [q]);

  const shown = q ? filtered : filtered.filter((g) => g.heading === active);

  return (
    <>
      <PageHero
        title="Course Descriptions"
        crumb={["Academics", "Course Descriptions"]}
        blurb="Browse Midwest University courses by program prefix."
      />
      <div className="wrap grid lg:grid-cols-[15rem_1fr] gap-10 py-10 lg:py-14">
        <AcademicAside active="/academics/course-descriptions" />
        <article>
          <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-brand-slate text-sm">
              {courseGroups.reduce((n, g) => n + g.courses.length, 0)} courses · {courseGroups.length}{" "}
              prefixes
            </p>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses…"
              className="w-full sm:w-72 rounded-md border border-brand-line px-3 py-2 text-sm"
            />
          </div>

          {!q && (
            <div className="flex flex-wrap gap-2 mb-8 max-h-40 overflow-y-auto">
              {courseGroups.map((g) => (
                <button
                  key={g.heading}
                  type="button"
                  onClick={() => setActive(g.heading)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded border transition ${
                    active === g.heading
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "border-brand-line text-brand-navy bg-brand-paper hover:border-brand-navy"
                  }`}
                >
                  {g.heading.replace(/\s*\([^)]+\)\s*$/, "")}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-10">
            {shown.map((g) => (
              <section key={g.heading} id={g.heading}>
                <h2 className="font-serif text-brand-navy text-xl mb-4 border-b border-brand-line pb-2">
                  <span className="inline-block w-7 h-[3px] bg-brand-gold align-middle mr-2 mb-1" aria-hidden />
                  {g.heading}
                  <span className="text-sm text-brand-muted font-sans ml-2">{g.courses.length}</span>
                </h2>
                <ul className="space-y-4">
                  {g.courses.map((c) => (
                    <li key={`${c.code}-${c.number}-${c.title}`} className="border-b border-brand-line/60 pb-4">
                      <p className="font-semibold text-brand-navy">
                        <span className="text-brand-gold mr-1.5">
                          {c.code} {c.number}
                        </span>
                        {c.title}
                        {c.credits && (
                          <span className="text-brand-muted font-normal text-sm ml-1.5">
                            ({c.credits} cr.)
                          </span>
                        )}
                      </p>
                      {c.body && <p className="mt-1.5 text-sm text-brand-slate leading-relaxed">{c.body}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {shown.length === 0 && (
              <p className="text-brand-muted">No courses match your search.</p>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
