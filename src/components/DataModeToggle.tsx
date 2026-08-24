"use client";

import { useEffect, useState } from "react";

type ModeState = { mode: "dummy" | "real"; demo: boolean };

/**
 * [Dummy/Real] 이미지·표시 모드 스위치.
 * Real = 원본 Midwest 이미지 자산 / Dummy = AI 시안 이미지(media/dummy).
 * 더미 게시 데이터는 삭제하지 않음.
 */
export default function DataModeToggle() {
  const [state, setState] = useState<ModeState>({ mode: "real", demo: true });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/mode")
      .then((r) => r.json())
      .then((s: ModeState) => setState(s))
      .catch(() => {});
  }, []);

  async function switchTo(mode: "dummy" | "real") {
    if (busy || mode === state.mode) return;
    setBusy(true);
    try {
      const r = await fetch("/api/mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      if (r.ok) {
        const next = (await r.json()) as ModeState;
        setState(next);
        // Reload so CSS background-image / middleware rewrite picks up cookie
        window.location.reload();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="hidden sm:flex items-center gap-1 rounded-full border border-brand-line bg-brand-paper px-1 py-1 text-[0.72rem] font-bold"
      title={
        state.mode === "real"
          ? "Real: 원본 Midwest 이미지"
          : "Dummy: AI 시안 이미지 (게시 데이터는 유지)"
      }
    >
      {(["dummy", "real"] as const).map((m) => (
        <button
          key={m}
          onClick={() => switchTo(m)}
          disabled={busy}
          className={`px-2.5 py-1 rounded-full uppercase transition ${
            state.mode === m ? "bg-brand-navy text-white" : "text-brand-muted hover:text-brand-navy"
          }`}
        >
          {m}
        </button>
      ))}
      {state.demo && (
        <span className="px-1.5 text-brand-gold" aria-label="demo mode" title="DB 미연결 — 쿠키로 이미지 모드만 전환">
          DEMO
        </span>
      )}
    </div>
  );
}
