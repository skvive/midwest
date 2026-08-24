import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Hard Delete — 관리자 전용(x-admin-key). is_dummy 행 영구 삭제. */
export async function POST(req: Request) {
  const key = req.headers.get("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "DEMO 모드" }, { status: 409 });
  try {
    await sql`DELETE FROM posts WHERE is_dummy = TRUE`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
