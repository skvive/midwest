/**
 * In-Memory SSOT — DATABASE_URL 미설정 시 폴백 데이터.
 * db/seed.sql 과 1:1 동기화 유지. 전 행 is_dummy = TRUE.
 */

export type BoardKey = "bulletin" | "gallery" | "miri";

export interface Post {
  id: number;
  board: BoardKey;
  title: string;
  body: string;
  date: string; // YYYY-MM-DD
  image?: string;
  is_dummy: boolean;
  deleted_at: string | null;
}

/** 원본 사이트에서 확인된 실제 헤드라인 + 데모용 더미 확장 (전 행 is_dummy) */
export const posts: Post[] = [
  {
    id: 1, board: "gallery",
    title: "DBA Program Hosts DBA 802 Intensive Course",
    body: "The newly launched Doctor of Business Administration program hosted the DBA 802 (Data Analytics and Strategic Decision Intelligence) intensive course at the St. Louis campus. Students engaged in data visualization, predictive analytics, and AI-enabled decision support workshops.",
    date: "2026-08-10", image: "/media/innoboard/files/inno_64/Business Administration.jpg",
    is_dummy: true, deleted_at: null,
  },
  {
    id: 2, board: "gallery",
    title: "New Doctoral Program Open",
    body: "Midwest University announces the opening of new doctoral programs including the Doctor of Business Administration (DBA) and Ph.D. in Financial Economics. Applications are now being accepted for the upcoming semester.",
    date: "2026-07-28", image: "/media/innoboard/files/inno_64/1(28).jpg",
    is_dummy: true, deleted_at: null,
  },
  {
    id: 3, board: "miri",
    title: "F-1 Visa Uncertainty Grows — Guidance for International Students",
    body: "MIRI shares the latest guidance for international students regarding F-1 visa policy updates. Students are encouraged to consult the International Student Office for SEVIS advising and to keep their documentation current.",
    date: "2026-08-05", is_dummy: true, deleted_at: null,
  },
  {
    id: 4, board: "bulletin",
    title: "2026 Fall Semester Registration Notice",
    body: "Registration for the 2026 Fall semester is now open. Please log in to Populi to register for courses. Contact the Registrar's Office for assistance with enrollment, add/drop, and academic advising.",
    date: "2026-08-01", is_dummy: true, deleted_at: null,
  },
  {
    id: 5, board: "bulletin",
    title: "Commencement 2026 & 40th Anniversary Celebration",
    body: "Midwest University celebrates its 40th anniversary together with Commencement 2026. All students, alumni, faculty, and friends are invited to join the ceremony at the Wentzville campus.",
    date: "2026-06-15", image: "/media/images/2026 Midwest Graduation.jpg",
    is_dummy: true, deleted_at: null,
  },
  {
    id: 6, board: "bulletin",
    title: "2026 Music Concert — School of Music",
    body: "The School of Music presents the 2026 annual concert featuring student and faculty performances. Admission is free and open to the community.",
    date: "2026-05-20", image: "/media/images/2026 music concert.jpg",
    is_dummy: true, deleted_at: null,
  },
  {
    id: 7, board: "bulletin",
    title: "Academic Calendar Update — Summer Session",
    body: "The updated academic calendar for the summer session has been posted. Please review key dates for registration, holidays, and final examinations.",
    date: "2026-04-30", is_dummy: true, deleted_at: null,
  },
  {
    id: 8, board: "miri",
    title: "MIRI J-1 Research Internship — Now Accepting Applications",
    body: "The Midwest Institute of Research and Innovation (MIRI) is accepting applications for the J-1 Student Intern and J-1 Professor/Research Scholar programs. See the J-1 Forms page for required documents.",
    date: "2026-07-15", is_dummy: true, deleted_at: null,
  },
];

export const BOARD_META: Record<BoardKey, { title: string; route: string; crumb: string[] }> = {
  bulletin: { title: "Official Bulletin", route: "/student-life/official-bulletin", crumb: ["Student Life", "Official Bulletin"] },
  gallery: { title: "Gallery News", route: "/student-life/gallery-news", crumb: ["Student Life", "Gallery News"] },
  miri: { title: "MIRI News", route: "/research/miri-news", crumb: ["Research", "MIRI News"] },
};

/** 프로그램 파인더 메타 (원본 ACADEMICS 구조 기준) */
export const PROGRAM_LEVELS = [
  { key: "esl", label: "ESL · Certificate" },
  { key: "bachelor", label: "Bachelor's" },
  { key: "master", label: "Master's" },
  { key: "doctoral", label: "Doctoral" },
] as const;
