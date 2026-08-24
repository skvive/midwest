export interface NavItem { label: string; href: string }
export interface NavGroup { label: string; href: string; items: NavItem[] }

export const NAV: NavGroup[] = [
  {
    label: "About", href: "/about/overview",
    items: [
      { label: "Overview", href: "/about/overview" },
      { label: "Mission", href: "/about/mission" },
      { label: "President's Welcome", href: "/about/president" },
      { label: "Board Chairman", href: "/about/chairman" },
      { label: "Accreditation", href: "/about/accreditation" },
      { label: "History", href: "/about/history" },
      { label: "Administration & Staff", href: "/about/administration" },
      { label: "School Profile", href: "/about/profile" },
      { label: "Visit Us — St. Louis", href: "/about/stl" },
      { label: "Seoul Site", href: "/about/seoul" },
      { label: "Global Network", href: "/about/global-network" },
    ],
  },
  {
    label: "Academics", href: "/academics/programs",
    items: [
      { label: "Program Finder", href: "/academics/programs" },
      { label: "Academic Calendar", href: "/academics/calendar" },
      { label: "Course Descriptions", href: "/academics/course-descriptions" },
      { label: "Academic Information", href: "/academics/information" },
      { label: "Catalog", href: "/academics/catalog" },
      { label: "Faculty", href: "/academics/faculty" },
      { label: "Endowed Chair Professors", href: "/academics/endowed-chair-professors" },
      { label: "Adjunct Professors", href: "/academics/adjunct-professors" },
    ],
  },
  {
    label: "Admissions", href: "/admissions/requirements",
    items: [
      { label: "Policies", href: "/admissions/policies" },
      { label: "Requirements", href: "/admissions/requirements" },
      { label: "Tuition", href: "/admissions/tuition" },
      { label: "Scholarships", href: "/admissions/scholarship" },
      { label: "Refund Policy", href: "/admissions/refund" },
      { label: "International — SEVIS", href: "/admissions/sevis" },
      { label: "Student Advising", href: "/admissions/advising" },
      { label: "E-Learning Admission", href: "/admissions/elearning" },
      { label: "On-Campus Admission", href: "/admissions/oncampus" },
      { label: "Admission FAQ", href: "/admissions/faq" },
    ],
  },
  {
    label: "Student Life", href: "/student-life/official-bulletin",
    items: [
      { label: "Official Bulletin", href: "/student-life/official-bulletin" },
      { label: "Gallery News", href: "/student-life/gallery-news" },
      { label: "Campus Tour", href: "/student-life/campus-tour" },
      { label: "Residence", href: "/student-life/residence" },
      { label: "Student Government", href: "/student-life/government" },
      { label: "Official Forms", href: "/student-life/official-form" },
      { label: "Christian Life", href: "/student-life/christian" },
    ],
  },
  {
    label: "Research", href: "/research/miri-program",
    items: [
      { label: "MIRI Research Program", href: "/research/miri-program" },
      { label: "MIRI News", href: "/research/miri-news" },
      { label: "J-1 Student Intern", href: "/research/j1visa" },
      { label: "J-1 Professor / Scholar", href: "/research/j1professor" },
      { label: "J-1 Forms", href: "/research/j1forms" },
      { label: "Job Offer", href: "/research/j1visa-jobs" },
      { label: "J-1 FAQ", href: "/research/j1visaqna" },
    ],
  },
  {
    label: "Language Center", href: "/language-center/welcome",
    items: [
      { label: "Welcome", href: "/language-center/welcome" },
      { label: "ESL Programs", href: "/language-center/esl" },
      { label: "Sejong Institute", href: "/language-center/introduction" },
    ],
  },
  {
    label: "Alumni", href: "/alumni/general",
    items: [
      { label: "Alumni Home", href: "/alumni/general" },
      { label: "Alumni Association", href: "/alumni/alumni" },
      { label: "Giving & Donation", href: "/alumni/donation-guide" },
      { label: "Graduation Ceremony", href: "/alumni/graduation-ceremony" },
    ],
  },
  {
    label: "Library", href: "/library/about",
    items: [
      { label: "About the Library", href: "/library/about" },
      { label: "Library Guide", href: "/library/guide" },
      { label: "Facilities", href: "/library/facilities" },
      { label: "Borrowing", href: "/library/borrow" },
      { label: "Databases", href: "/library/database" },
      { label: "E-Journals", href: "/library/ejournal" },
    ],
  },
];

export const AUDIENCES = [
  { label: "Prospective Students", href: "/admissions/requirements" },
  { label: "Current Students", href: "/student-life/official-bulletin" },
  { label: "International (SEVIS·J-1)", href: "/admissions/sevis" },
  { label: "Alumni & Friends", href: "/alumni/general" },
];
