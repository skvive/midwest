/** Clean scraped content blocks: drop duplicates, mega-rows, split bullet lines. */
import type { Block, Section } from "./content";

export function cleanSectionBlocks(section: Section): Block[] {
  const raw = section.blocks || [];
  const out: Block[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < raw.length; i++) {
    const b = raw[i];
    let x = (b.x || "").replace(/\s+/g, " ").trim();
    if (!x) continue;

    // Skip exact duplicate of previous emitted text
    const key = x.toLowerCase();
    if (seen.has(key)) continue;

    // Skip mega row/p when following short lines expand the same content
    if (x.length > 220 && (b.t === "row" || b.t === "p")) {
      const follow = raw.slice(i + 1, i + 12).map((f) => (f.x || "").trim()).filter(Boolean);
      const covered = follow.filter((f) => f.length < 200 && x.includes(f)).length;
      if (covered >= 2) continue;
    }

    // Split bullet-joined mega lines into list items
    if (x.includes(" • ") && x.length > 120) {
      const parts = x.split(/\s*•\s*/).map((p) => p.trim()).filter(Boolean);
      if (parts.length > 1) {
        for (const part of parts) {
          const pk = part.toLowerCase();
          if (seen.has(pk)) continue;
          seen.add(pk);
          out.push({ t: "li", x: part });
        }
        continue;
      }
    }

    // Normalize leading bullet on paragraphs into list items
    if (b.t === "p" && /^[•·]/.test(x)) {
      x = x.replace(/^[•·]\s*/, "");
      seen.add(x.toLowerCase());
      out.push({ t: "li", x });
      continue;
    }

    seen.add(key);
    out.push({ ...b, x });
  }

  return out;
}
