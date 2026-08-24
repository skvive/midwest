import type { Metadata } from "next";
import HomeView from "@/components/HomeView";

export const metadata: Metadata = {
  title: "미드웨스트대학교 — 세인트루이스, 미주리",
  description:
    "미드웨스트대학교는 성경적 세계관 위에 세워진 고등교육기관으로 ESL·학사·석사·박사 과정을 제공합니다.",
  alternates: { canonical: "/ko" },
};

export default function KoreanHome() {
  return <HomeView locale="ko" />;
}
