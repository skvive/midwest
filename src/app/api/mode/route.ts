import { NextResponse } from "next/server";
import { getSql, getDataMode } from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const COOKIE = "mu_data_mode";

function withModeCookie(body: { mode: "dummy" | "real"; demo: boolean }) {
  const res = NextResponse.json(body);
  res.cookies.set(COOKIE, body.mode, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export async function GET() {
  const cookieMode = cookies().get(COOKIE)?.value;
  const state = await getDataMode();

  if (!state.demo) {
    // Sync cookie to DB mode (default real)
    const mode = state.mode === "dummy" ? "dummy" : "real";
    return withModeCookie({ mode, demo: false });
  }

  const mode = cookieMode === "dummy" ? "dummy" : "real";
  return withModeCookie({ mode, demo: true });
}

/**
 * 모드 전환 — app_state / 쿠키만 갱신.
 * 더미 게시글 Soft Delete 하지 않음 (디자인 참조용 데이터 유지).
 * Real = 원본 Midwest 이미지, Dummy = /media/dummy AI 시안 이미지.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const mode = body?.mode;
  if (mode !== "dummy" && mode !== "real") {
    return NextResponse.json({ error: "mode must be 'dummy' | 'real'" }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    // DEMO: cookie-only image mode switch (no DB)
    return withModeCookie({ mode, demo: true });
  }

  try {
    // Ensure any previously soft-deleted dummy rows are restored (one-time heal)
    await sql.transaction([
      sql`UPDATE posts SET deleted_at = NULL WHERE is_dummy = TRUE AND deleted_at IS NOT NULL`,
      sql`INSERT INTO app_state (key, value) VALUES ('data_mode', ${mode})
          ON CONFLICT (key) DO UPDATE SET value = ${mode}`,
    ]);
    return withModeCookie({ mode, demo: false });
  } catch {
    return NextResponse.json({ error: "transaction failed" }, { status: 500 });
  }
}
