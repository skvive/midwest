import { BoardList } from "@/components/Board";

export const metadata = { title: "Official Bulletin" };
export default function Page() {
  return <BoardList board="bulletin" top="student-life" />;
}
