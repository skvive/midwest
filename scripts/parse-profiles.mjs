import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const pages = JSON.parse(fs.readFileSync(path.join(root, "../src/lib/pages.json"), "utf8"));

const NAME_RE = /^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+.+/i;

function parseProfileRoute(route) {
  const blocks = pages[route]?.sections?.[0]?.blocks || [];
  const people = [];
  let cur = null;

  const flush = () => {
    if (cur && cur.name) people.push(cur);
    cur = null;
  };

  for (const b of blocks) {
    const x = (b.x || "").replace(/\s+/g, " ").trim();
    if (!x) continue;

    if ((b.t === "row" || b.t === "p") && NAME_RE.test(x) && x.length < 80) {
      // new person — skip duplicate name-only p after row
      if (cur && cur.name === x) continue;
      flush();
      cur = { name: x, education: [], roles: [] };
      continue;
    }

    if (!cur) continue;

    // Skip mega dump rows (details come as individual p lines)
    if (b.t === "row" && (x.includes(" • ") || x.length > 180)) continue;

    if (x.startsWith("•") || x.startsWith("·")) {
      cur.roles.push(x.replace(/^[•·]\s*/, "").trim());
      continue;
    }

    // Education / credentials lines
    if (
      /^(B\.|M\.|Ph\.|D\.|Ed\.|Th\.|J\.|A\.|Korea |Seoul |Princeton |Honorary |Doctor |Passed )/i.test(x) ||
      /\b(University|Academy|College|Institute|Post-Doc|Examination)\b/i.test(x)
    ) {
      // avoid duplicating roles mistaken as education
      if (!x.includes("Director") && !x.includes("President") && !x.includes("Minister") && !x.includes("Chair")) {
        cur.education.push(x);
        continue;
      }
    }

    // fallback: treat as role if looks like title
    if (x.length > 20) cur.roles.push(x.replace(/^[•·]\s*/, ""));
  }
  flush();
  return people;
}

const adjunct = parseProfileRoute("/academics/adjunct-professors");
const endowed = parseProfileRoute("/academics/endowed-chair-professors");

fs.writeFileSync(path.join(root, "../src/lib/adjunct-data.json"), JSON.stringify(adjunct, null, 2));
fs.writeFileSync(path.join(root, "../src/lib/endowed-data.json"), JSON.stringify(endowed, null, 2));
console.log("adjunct", adjunct.length, "endowed", endowed.length);
console.log(JSON.stringify(adjunct[0], null, 2));
console.log(JSON.stringify(endowed[0], null, 2));

// Administration
function parseAdmin() {
  const sections = pages["/about/administration"]?.sections || [];
  const out = [];
  for (const sec of sections) {
    const items = [];
    for (const b of sec.blocks || []) {
      if (b.t !== "li") continue;
      let x = (b.x || "").replace(/\s+/g, " ").trim();
      if (!x || x.length > 900) {
        // split jammed multi-role lines on pattern "Title, Name"
        // keep only if we can extract something useful — skip mega
        if (x.length > 900) continue;
      }

      // Extract emails
      const emails = [...x.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)].map((m) => m[0]);
      let rest = x;
      for (const e of emails) rest = rest.replace(e, "").trim();
      rest = rest.replace(/,+\s*$/, "").replace(/\s{2,}/g, " ").trim();

      // Heuristic: last "Dr./Prof./Ms./Mr. Name" or trailing name after title
      let title = rest;
      let name = "";
      const nameMatch = rest.match(
        /^(.*?)(?:,\s*)?((?:Dr\.|Prof\.|Ms\.|Mr\.|Mrs\.)\s+[A-Za-z][A-Za-z\s\.\-']+|[A-Za-z][A-Za-z\s\.\-']+,\s*Ph\.D\.?)$/
      );
      if (nameMatch && nameMatch[1].trim().length > 2) {
        title = nameMatch[1].replace(/,\s*$/, "").trim();
        name = nameMatch[2].trim();
      } else {
        // "Role Name email" without comma — split on Dr/Prof/Ms/Mr
        const m2 = rest.match(/^(.*?)((?:Dr\.|Prof\.|Ms\.|Mr\.|Mrs\.)\s+.+)$/);
        if (m2 && m2[1].trim().length > 2) {
          title = m2[1].trim();
          name = m2[2].trim();
        }
      }

      // Skip junk footer lines
      if (/^DS-2019|^Midwest Academy|^\(US Federal/i.test(x) && !name) {
        items.push({ title: x.slice(0, 120), name: "", emails: emails });
        continue;
      }

      items.push({ title: title || rest, name, emails });
    }
    out.push({ heading: sec.heading || "Administration", items });
  }
  return out;
}

const admin = parseAdmin();
fs.writeFileSync(path.join(root, "../src/lib/admin-data.json"), JSON.stringify(admin, null, 2));
console.log("admin sections", admin.map((s) => `${s.heading}:${s.items.length}`));
