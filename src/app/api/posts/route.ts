import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { posts } from "@/lib/data";

export const dynamic = "force-dynamic";

/** 도메인 목록 API — ?board=bulletin|gallery|miri. DB 연결 시 DB, 아니면 In-Memory SSOT. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const board = searchParams.get("board");
  const sql = getSql();
  if (sql) {
    try {
      const rows = board
        ? await sql`SELECT * FROM active_posts WHERE board = ${board} ORDER BY date DESC`
        : await sql`SELECT * FROM active_posts ORDER BY date DESC`;
      return NextResponse.json({ source: "db", items: rows });
    } catch {
      /* fall through */
    }
  }
  const items = posts
    .filter((p) => !p.deleted_at && (!board || p.board === board))
    .sort((a, b) => b.date.localeCompare(a.date));
  return NextResponse.json({ source: "memory", items });
}
