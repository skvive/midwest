import { notFound } from "next/navigation";
import { BoardDetail, boardStaticIds } from "@/components/Board";
import { posts } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return boardStaticIds("miri");
}

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!posts.some((p) => p.board === "miri" && p.id === id)) notFound();
  return <BoardDetail board="miri" id={id} top="research" />;
}
