import { NextResponse } from "next/server";
import { getSql, getDataMode } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getDataMode());
}

/**
 * 모드 전환. real 전환 시 confirm:"RESET" 필수(이중 안전장치) —
 * is_dummy=TRUE 행을 FK 순서(자식→부모)대로 Soft Delete + app_state 갱신을 트랜잭션으로 원자 실행.
 * dummy 복귀 시 deleted_at 복원.
 */
export async function POST(req: Request) {
  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DEMO 모드 — DATABASE_URL 미설정", mode: "dummy", demo: true }, { status: 409 });
  }
  const body = await req.json().catch(() => ({}));
  const mode = body?.mode;
  if (mode !== "dummy" && mode !== "real") {
    return NextResponse.json({ error: "mode must be 'dummy' | 'real'" }, { status: 400 });
  }
  if (mode === "real" && body?.confirm !== "RESET") {
    return NextResponse.json({ error: 'confirm:"RESET" required' }, { status: 400 });
  }
  try {
    if (mode === "real") {
      await sql.transaction([
        sql`UPDATE posts SET deleted_at = NOW() WHERE is_dummy = TRUE AND deleted_at IS NULL`,
        sql`INSERT INTO app_state (key, value) VALUES ('data_mode', 'real')
            ON CONFLICT (key) DO UPDATE SET value = 'real'`,
      ]);
    } else {
      await sql.transaction([
        sql`UPDATE posts SET deleted_at = NULL WHERE is_dummy = TRUE`,
        sql`INSERT INTO app_state (key, value) VALUES ('data_mode', 'dummy')
            ON CONFLICT (key) DO UPDATE SET value = 'dummy'`,
      ]);
    }
    return NextResponse.json({ mode, demo: false });
  } catch (e) {
    return NextResponse.json({ error: "transaction failed" }, { status: 500 });
  }
}
