import { notFound } from "next/navigation";
import { BoardDetail, boardStaticIds } from "@/components/Board";
import { posts } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return boardStaticIds("gallery");
}

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!posts.some((p) => p.board === "gallery" && p.id === id)) notFound();
  return <BoardDetail board="gallery" id={id} top="student-life" />;
}
