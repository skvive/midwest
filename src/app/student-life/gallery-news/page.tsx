import { BoardList } from "@/components/Board";

export const metadata = { title: "Gallery News" };
export default function Page() {
  return <BoardList board="gallery" top="student-life" />;
}
