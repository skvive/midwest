import pagesJson from "./pages.json";

export type Block = { t: "p" | "li" | "row"; x: string };
export type Section = { heading: string | null; level: number; blocks: Block[] };
export type Page = {
  route: string;
  title: string;
  breadcrumb: string[];
  sourceUrl: string;
  sections: Section[];
};

/** 게시판·특수 라우트는 전용 페이지가 담당하므로 제네릭 렌더러에서 제외 */
const EXCLUDED = new Set([
  "/",
  "/academics/faculty",
  "/student-life/official-bulletin",
  "/student-life/gallery-news",
  "/research/miri-news",
  "/alumni/bulletin",
  "/language-center/board",
  "/library/bulletin",
  "/library/news",
]);

const all = pagesJson as unknown as Record<string, Page>;

export const pages: Record<string, Page> = Object.fromEntries(
  Object.entries(all).filter(([r]) => !EXCLUDED.has(r))
);

export function getPage(route: string): Page | undefined {
  return pages[route];
}

export function allRoutes(): string[] {
  return Object.keys(pages);
}

/** 같은 최상위 섹션의 형제 페이지 (사이드 내비용) */
export function siblings(route: string): Page[] {
  const top = "/" + route.split("/")[1];
  return Object.values(pages)
    .filter((p) => p.route.startsWith(top + "/") || p.route === top)
    .sort((a, b) => a.route.localeCompare(b.route));
}

export const SECTION_LABELS: Record<string, string> = {
  about: "About",
  academics: "Academics",
  admissions: "Admissions",
  "student-life": "Student Life",
  research: "Research",
  "language-center": "Language Center",
  alumni: "Alumni",
  library: "Library",
  media: "Media",
};

export const SECTION_HERO: Record<string, string> = {
  about: "/media/img/01about/07-01campus.jpg",
  academics: "/media/img/01about/01school_1.jpg",
  admissions: "/media/img/04student/03-02.jpg",
  "student-life": "/media/img/04student/03-05.jpg",
  research: "/media/img/04student/03-15.jpg",
  "language-center": "/media/img/04student/03-11.jpg",
  alumni: "/media/images/2026 Midwest Graduation.jpg",
  library: "/media/img/07library/02-01LibraryBooks.jpg",
  media: "/media/img/04student/03-06_.jpg",
};
