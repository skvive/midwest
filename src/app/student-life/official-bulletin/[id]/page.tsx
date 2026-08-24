import { notFound } from "next/navigation";
import { BoardDetail, boardStaticIds } from "@/components/Board";
import { posts } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return boardStaticIds("bulletin");
}

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!posts.some((p) => p.board === "bulletin" && p.id === id)) notFound();
  return <BoardDetail board="bulletin" id={id} top="student-life" />;
}
