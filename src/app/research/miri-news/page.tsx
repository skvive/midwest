import { BoardList } from "@/components/Board";

export const metadata = { title: "MIRI News" };
export default function Page() {
  return <BoardList board="miri" top="research" />;
}
