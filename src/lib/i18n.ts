import { NAV, AUDIENCES, type NavGroup } from "./nav";

export type Locale = "en" | "ko";

export function getLocaleFromPath(pathname: string | null): Locale {
  if (!pathname) return "en";
  return pathname === "/ko" || pathname.startsWith("/ko/") ? "ko" : "en";
}

/** Strip /ko prefix for path matching */
export function stripLocale(pathname: string): string {
  if (pathname === "/ko") return "/";
  if (pathname.startsWith("/ko/")) return pathname.slice(3) || "/";
  return pathname;
}

/** Prefix path with /ko when locale is Korean */
export function localePath(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  if (locale === "en") return href;
  if (href === "/") return "/ko";
  return `/ko${href}`;
}

/** Switch between EN ↔ KO keeping the same page */
export function switchLocalePath(pathname: string, next: Locale): string {
  const bare = stripLocale(pathname);
  return localePath(bare, next);
}

const NAV_KO_LABELS: Record<string, string> = {
  About: "소개",
  Academics: "학사",
  Admissions: "입학",
  "Student Life": "캠퍼스 생활",
  Research: "연구",
  "Language Center": "언어센터",
  Alumni: "동문",
  Library: "도서관",
  Overview: "개요",
  Mission: "사명",
  "President's Welcome": "총장 인사",
  "Board Chairman": "이사장",
  Accreditation: "인가",
  History: "역사",
  "Administration & Staff": "행정·교직원",
  "School Profile": "학교 소개",
  "Visit Us — St. Louis": "방문 — 세인트루이스",
  "Seoul Site": "서울 캠퍼스",
  "Global Network": "글로벌 네트워크",
  "Program Finder": "프로그램 찾기",
  "Academic Calendar": "학사 일정",
  "Course Descriptions": "교과목 안내",
  "Academic Information": "학사 정보",
  Catalog: "카탈로그",
  Faculty: "교수진",
  "Endowed Chair Professors": "석좌교수",
  "Adjunct Professors": "겸임교수",
  Policies: "입학 정책",
  Requirements: "지원 자격",
  Tuition: "등록금",
  Scholarships: "장학금",
  "Refund Policy": "환불 정책",
  "International — SEVIS": "국제학생 — SEVIS",
  "Student Advising": "학생 상담",
  "E-Learning Admission": "이러닝 입학",
  "On-Campus Admission": "온캠퍼스 입학",
  "Admission FAQ": "입학 FAQ",
  "Official Bulletin": "공지사항",
  "Gallery News": "갤러리 뉴스",
  "Campus Tour": "캠퍼스 투어",
  Residence: "기숙사",
  "Student Government": "학생회",
  "Official Forms": "공식 양식",
  "Christian Life": "신앙생활",
  "MIRI Research Program": "MIRI 연구 프로그램",
  "MIRI News": "MIRI 뉴스",
  "J-1 Student Intern": "J-1 인턴",
  "J-1 Professor / Scholar": "J-1 교수·연구자",
  "J-1 Forms": "J-1 양식",
  "Job Offer": "채용 제안",
  "J-1 FAQ": "J-1 FAQ",
  Welcome: "환영합니다",
  "ESL Programs": "ESL 프로그램",
  "Sejong Institute": "세종학당",
  "Alumni Home": "동문 홈",
  "Alumni Association": "동문회",
  "Giving & Donation": "기부",
  "Graduation Ceremony": "졸업식",
  "About the Library": "도서관 소개",
  "Library Guide": "이용 안내",
  Facilities: "시설",
  Borrowing: "대출",
  Databases: "데이터베이스",
  "E-Journals": "전자저널",
  "Prospective Students": "예비 학생",
  "Current Students": "재학생",
  "International (SEVIS·J-1)": "국제학생 (SEVIS·J-1)",
  "Alumni & Friends": "동문·후원자",
};

export function localizedNav(locale: Locale): NavGroup[] {
  if (locale === "en") return NAV;
  return NAV.map((g) => ({
    ...g,
    label: NAV_KO_LABELS[g.label] ?? g.label,
    href: localePath(g.href, "ko"),
    items: g.items.map((it) => ({
      ...it,
      label: NAV_KO_LABELS[it.label] ?? it.label,
      href: localePath(it.href, "ko"),
    })),
  }));
}

export function localizedAudiences(locale: Locale) {
  return AUDIENCES.map((a) => ({
    ...a,
    label: locale === "ko" ? NAV_KO_LABELS[a.label] ?? a.label : a.label,
    href: localePath(a.href, locale),
  }));
}

export const ui = {
  en: {
    apply: "Apply",
    applyOnline: "Apply Online",
    visitUs: "Visit Us",
    informationFor: "Information for:",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to main content",
    home: "Home",
    campusTourCta: "Request Campus Tour",
    allPrograms: "All programs →",
    campusTourLink: "Campus tour →",
    allNews: "All news →",
    resources: "Resources",
    footerCopy: "© 2026 Midwest University · Facebook · Instagram · YouTube · Staff Login",
    heroEyebrow: "Since 1986 · Wentzville, Missouri",
    heroTitle1: "Scholarship,",
    heroTitle2: "anchored in purpose.",
    heroBody:
      "Midwest University is a biblically-based institution of higher education that prepares men and women for success in ministry and professional fields through academic rigor and personal care.",
    missionCite: "MISSION & PURPOSE STATEMENT",
    story1Eyebrow: "Academics",
    story1Title: "Small classes. Deeper learning.",
    story1Body:
      "Six bachelor's, seven master's, and thirteen doctoral programs plus ESL. Choose on-campus, blended, or e-learning in a close faculty–student environment.",
    story1Link: "Program finder →",
    story2Eyebrow: "Global",
    story2Title: "From St. Louis to the world.",
    story2Body:
      "Offices in Seoul, Lima, Bangkok, and Ho Chi Minh support study-abroad advising and SEVIS·J-1 procedures. Korean language and culture programs run with the Sejong Institute.",
    story2Link: "International students →",
    campusLife: "Campus Life",
    degrees: "Degrees & Programs",
    news: "News & Announcements",
    visitTitle: "Visit our St. Louis campus.",
    visitBody:
      "851 Parr Rd, Wentzville — campus tours and admissions counseling are welcome. Seoul site counseling is also available.",
    programs: [
      { no: "01", title: "ESL · Certificate", desc: "Intensive English · Sejong Institute Korean" },
      { no: "02", title: "Bachelor's — 6 Programs", desc: "Business · Biblical Studies · Music · Aviation Mgmt" },
      { no: "03", title: "Master's — 7 Programs", desc: "MBA · Counseling · Education · TESOL · Divinity" },
      { no: "04", title: "Doctoral — 13 Programs", desc: "DBA · Ph.D · D.Min · DMA · DFA" },
    ],
    stats: [
      ["40+", "Years of Heritage"],
      ["27", "Degree Programs"],
      ["5", "Global Offices"],
      ["1:8", "Small-Class Ratio"],
    ],
    factLabels: ["YEARS", "PROGRAMS", "GLOBAL OFFICES"],
  },
  ko: {
    apply: "지원하기",
    applyOnline: "온라인 지원",
    visitUs: "방문하기",
    informationFor: "대상:",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    skipToContent: "본문으로 건너뛰기",
    home: "홈",
    campusTourCta: "캠퍼스 투어 신청",
    allPrograms: "전체 프로그램 →",
    campusTourLink: "캠퍼스 투어 →",
    allNews: "전체 소식 →",
    resources: "리소스",
    footerCopy: "© 2026 Midwest University · Facebook · Instagram · YouTube · Staff Login",
    heroEyebrow: "1986년 설립 · 미주리 웬츠빌",
    heroTitle1: "목적 위에 선",
    heroTitle2: "학문과 섬김.",
    heroBody:
      "미드웨스트대학교는 성경적 세계관 위에 세워진 고등교육기관으로, 학문적 엄격함과 인격적 돌봄을 통해 사역과 전문 분야 모두에서의 성공을 준비시킵니다.",
    missionCite: "사명 · 목적 선언",
    story1Eyebrow: "학사",
    story1Title: "소수정예 강의실, 깊이 있는 배움",
    story1Body:
      "학사 6개·석사 7개·박사 13개 학위과정과 ESL 프로그램. 교수와 학생이 가까이 마주하는 small-class 환경에서 대면·블렌디드·이러닝 방식을 자유롭게 선택할 수 있습니다.",
    story1Link: "프로그램 파인더 →",
    story2Eyebrow: "글로벌",
    story2Title: "세인트루이스에서 세계로",
    story2Body:
      "서울·리마·방콕·호치민 오피스가 유학 상담과 SEVIS·J-1 비자 절차를 지원합니다. 세종학당과 함께하는 한국어·문화 프로그램도 운영합니다.",
    story2Link: "국제학생 안내 →",
    campusLife: "캠퍼스 생활",
    degrees: "학위 · 프로그램",
    news: "뉴스 · 공지",
    visitTitle: "세인트루이스 캠퍼스를 방문하세요.",
    visitBody:
      "851 Parr Rd, Wentzville — 캠퍼스 투어와 입학 상담을 환영합니다. 서울 사이트에서도 상담이 가능합니다.",
    programs: [
      { no: "01", title: "ESL · 수료과정", desc: "집중 영어 · 세종학당 한국어" },
      { no: "02", title: "학사 — 6개 과정", desc: "경영 · 신학 · 음악 · 항공경영" },
      { no: "03", title: "석사 — 7개 과정", desc: "MBA · 상담 · 교육 · TESOL · 목회학" },
      { no: "04", title: "박사 — 13개 과정", desc: "DBA · Ph.D · D.Min · DMA · DFA" },
    ],
    stats: [
      ["40+", "년의 역사"],
      ["27", "학위 프로그램"],
      ["5", "글로벌 오피스"],
      ["1:8", "소규모 수업 비율"],
    ],
    factLabels: ["년", "프로그램", "글로벌 오피스"],
  },
} as const;

export type UiDict = (typeof ui)["en"];
