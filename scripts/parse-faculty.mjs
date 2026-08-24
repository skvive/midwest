import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const pages = JSON.parse(fs.readFileSync(path.join(root, "../src/lib/pages.json"), "utf8"));
const blocks = pages["/academics/faculty"].sections[0].blocks;

const DEPTS = [
  "ESL & TESOL",
  "School of Aviation",
  "School of Business and Leadership",
  "School of Culture and Arts",
  "School of Music",
  "School of Education",
  "School of Counseling Psychology",
  "School of Theology",
];

const DEGREE =
  "(?:Ph\\.D(?:\\s+Candid\\.?)?|PhD|M\\.A|M\\.Ed|M\\.E|M\\.M|M\\.B\\.A|M\\.S|M\\.Div|Th\\.M|D\\.Min|D\\.M\\.A|D\\.M\\.E|D\\.B\\.A|D\\.L\\.E|D\\.L|D\\.F\\.A|D\\.C\\.M|D\\.M|D\\.R|D\\.Ed|Ed\\.D|Th\\.D|J\\.D|N\\.F\\.C\\.P|Honorary\\s+D\\.B\\.A|Honorary\\s+D\\.L)";

const nameRe = new RegExp(
  `^([A-Z][A-Za-z\\s\\-']+(?:\\s+[A-Z]\\.)?),\\s+([A-Za-z][A-Za-z\\s\\-\\.']+?),\\s*(${DEGREE})\\.?\\s*(.*)$`
);

function stripDept(text) {
  for (const d of DEPTS) {
    if (text.startsWith(d + " ")) return { dept: d, rest: text.slice(d.length).trim() };
  }
  return { dept: null, rest: text };
}

function parseBody(body) {
  let field = "";
  let education = "";
  let experience = "";
  const expIdx = body.search(/\bExperience:\s*/i);
  let before = body;
  if (expIdx >= 0) {
    experience = body.slice(expIdx).replace(/^Experience:\s*/i, "").trim();
    before = body.slice(0, expIdx).trim();
  }
  const eduMatch = before.match(
    new RegExp(`^(.*?)((?:${DEGREE}|B\\.[A-Z]|A\\.[A-Z]|Washington University).*)`)
  );
  if (eduMatch) {
    field = eduMatch[1].trim().replace(/[.,\\s]+$/, "");
    education = eduMatch[2].trim();
  } else {
    field = before;
  }
  return { field, education, experience };
}

function splitEducation(edu) {
  if (!edu) return [];
  return edu
    .split(/(?=(?:Ph\.D|PhD|M\.A|M\.Ed|M\.E|M\.M|M\.B\.A|M\.S|M\.Div|Th\.M|D\.Min|D\.M\.A|D\.M\.E|D\.B\.A|D\.L\.E|D\.L|D\.F\.A|D\.C\.M|D\.M|D\.R|D\.Ed|Ed\.D|Th\.D|J\.D|B\.A|B\.S|B\.M|B\.E|A\.D|A\.S|A\.I\.D\.M|N\.F\.C\.P|Washington University|Honorary)\b)/)
    .map((s) => s.trim().replace(/,?\s*$/, ""))
    .filter(Boolean);
}

function splitExperience(exp) {
  if (!exp) return [];
  return exp
    .split(/;\s*/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

const faculty = [];
const seen = new Map();
let currentDept = "Faculty";

for (const b of blocks) {
  if (b.t !== "li") continue;
  let text = b.x.replace(/\s+/g, " ").trim();
  if (text.length < 60) continue;

  // Track department from mega-headers even if we skip the blob
  for (const d of DEPTS) {
    if (text.startsWith(d)) {
      currentDept = d;
      break;
    }
  }

  // Skip department mega-dumps (multiple people jammed together)
  if (text.length > 1200) continue;
  // Skip if more than one "Experience:" (concatenated bios)
  if ((text.match(/\bExperience:/gi) || []).length > 1) continue;

  const { dept, rest } = stripDept(text);
  if (dept) {
    currentDept = dept;
    text = rest;
  }

  const m = text.match(nameRe);
  if (!m) continue;

  const last = m[1].trim();
  const first = m[2].trim();
  const degree = m[3].trim().replace(/\.$/, "");
  const name = `${last}, ${first}`;
  const key = name.toLowerCase();
  const { field, education, experience } = parseBody(m[4] || "");
  if (!education && !experience && !field) continue;

  // Drop if experience still contains another person's name pattern
  if (/\b[A-Z][a-z]+,\s+[A-Z][a-z][A-Za-z\s\-]+,\s*(?:Ph\.D|M\.A|D\.Min|M\.Ed|D\.M\.A|Ed\.D)/.test(experience)) {
    continue;
  }

  const entry = {
    name,
    degree,
    field: field || "",
    education: splitEducation(education),
    experience: splitExperience(experience),
    department: currentDept,
  };

  const prev = seen.get(key);
  if (prev) {
    const score = (e) => e.education.length + e.experience.length + (e.field ? 1 : 0);
    if (score(entry) > score(prev)) {
      const idx = faculty.indexOf(prev);
      faculty[idx] = entry;
      seen.set(key, entry);
    }
    continue;
  }
  seen.set(key, entry);
  faculty.push(entry);
}

const byDept = {};
faculty.forEach((f) => {
  byDept[f.department] = (byDept[f.department] || 0) + 1;
});
console.log("parsed", faculty.length, byDept);

fs.writeFileSync(
  new URL("../src/lib/faculty-data.json", import.meta.url),
  JSON.stringify(faculty, null, 2)
);
console.log("wrote src/lib/faculty-data.json");
