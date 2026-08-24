import { neon } from "@neondatabase/serverless";

/** DATABASE_URL 미설정 시 null → In-Memory 폴백(DEMO 모드) */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    return neon(url);
  } catch {
    return null;
  }
}

export type DataMode = "dummy" | "real";

/** app_state.data_mode 조회 (DB 없으면 dummy + demo) */
export async function getDataMode(): Promise<{ mode: DataMode; demo: boolean }> {
  const sql = getSql();
  if (!sql) return { mode: "dummy", demo: true };
  try {
    const rows = await sql`SELECT value FROM app_state WHERE key = 'data_mode' LIMIT 1`;
    const mode = (rows[0]?.value as DataMode) ?? "dummy";
    return { mode, demo: false };
  } catch {
    return { mode: "dummy", demo: true };
  }
}
