import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const pages = JSON.parse(fs.readFileSync(path.join(root, "../src/lib/pages.json"), "utf8"));
const page = pages["/academics/course-descriptions"];

const COURSE_SPLIT =
  /(?=(?:[A-Z]{2,4})\s+\d{3}[A-Z]?(?:\s|$))/g;

function parseCourseBlob(text) {
  const chunks = text
    .split(COURSE_SPLIT)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 10);
  const courses = [];
  for (const chunk of chunks) {
    const m = chunk.match(/^([A-Z]{2,4})\s+(\d{3}[A-Z]?)\s+(.+?)\s*\((\d+)\)\s*(.*)$/);
    if (!m) {
      // keep orphan text as note if long enough
      if (chunk.length > 40 && !/^top$/i.test(chunk)) {
        courses.push({ code: "", number: "", title: "", credits: "", body: chunk });
      }
      continue;
    }
    courses.push({
      code: m[1],
      number: m[2],
      title: m[3].trim(),
      credits: m[4],
      body: (m[5] || "").trim(),
    });
  }
  return courses;
}

const groups = [];
for (const sec of page.sections || []) {
  if (!sec.heading || sec.heading === "Course Descriptions") {
    const toc = (sec.blocks || [])
      .filter((b) => b.t === "li")
      .map((b) => b.x.trim())
      .filter(Boolean);
    if (toc.length) groups.push({ type: "toc", heading: "Programs", courses: [], toc });
    continue;
  }

  const heading = sec.heading.replace(/\s+top$/i, "").trim();
  // Expected prefix(es) from heading like "COUNSELING (CO)" or "FINANCE & ACCOUNTING (FA & FN)"
  const codeMatch = heading.match(/\(([A-Z]{2,4}(?:\s*&\s*[A-Z]{2,4})?)\)\s*$/);
  const allowed = codeMatch
    ? codeMatch[1].split(/\s*&\s*/).map((c) => c.trim())
    : [];

  const blob = (sec.blocks || []).map((b) => b.x).join(" ");
  // Skip absurd mega-dumps that contain the whole catalog (keep only if we can filter by code)
  let courses = parseCourseBlob(blob).filter((c) => c.code || c.body.length > 20);

  if (allowed.length) {
    courses = courses.filter((c) => allowed.includes(c.code));
  } else if (blob.length > 20000) {
    // Unscoped mega blob — skip
    continue;
  }

  const seen = new Set();
  const unique = [];
  for (const c of courses) {
    const key = c.code ? `${c.code} ${c.number}` : c.body.slice(0, 40);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(c);
  }
  if (unique.length) {
    groups.push({ type: "courses", heading, courses: unique, toc: [] });
  }
}

fs.writeFileSync(path.join(root, "../src/lib/courses-data.json"), JSON.stringify(groups, null, 2));
const total = groups.reduce((n, g) => n + g.courses.length, 0);
console.log("groups", groups.length, "courses", total);
console.log(groups.slice(0, 3).map((g) => ({ h: g.heading, n: g.courses.length, sample: g.courses[0] })));
