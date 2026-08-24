"use client";

import { useEffect, useState } from "react";

type ModeState = { mode: "dummy" | "real"; demo: boolean };

/** 우상단 상시 노출 [Dummy/Real] 전환 스위치. DB 미연결 시 DEMO 배지 + 전환 비활성. */
export default function DataModeToggle() {
  const [state, setState] = useState<ModeState>({ mode: "dummy", demo: true });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/mode")
      .then((r) => r.json())
      .then(setState)
      .catch(() => {});
  }, []);

  async function switchTo(mode: "dummy" | "real") {
    if (state.demo || busy || mode === state.mode) return;
    if (mode === "real") {
      // 2단계 확인 안전장치
      if (!confirm("Real 모드로 전환하면 더미 데이터가 정리(Soft Delete)됩니다. 계속할까요?")) return;
      if (prompt('확인을 위해 "RESET" 을 입력하세요.') !== "RESET") return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, confirm: mode === "real" ? "RESET" : undefined }),
      });
      if (r.ok) setState(await r.json());
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="hidden sm:flex items-center gap-1 rounded-full border border-brand-line bg-brand-paper px-1 py-1 text-[0.72rem] font-bold"
      title={state.demo ? "DATABASE_URL 미설정 — In-Memory 데모 모드" : "데이터 모드 전환"}
    >
      {(["dummy", "real"] as const).map((m) => (
        <button
          key={m}
          onClick={() => switchTo(m)}
          disabled={state.demo || busy}
          className={`px-2.5 py-1 rounded-full uppercase transition ${
            state.mode === m ? "bg-brand-navy text-white" : "text-brand-muted"
          } ${state.demo ? "cursor-not-allowed" : "hover:text-brand-navy"}`}
        >
          {m}
        </button>
      ))}
      {state.demo && (
        <span className="px-1.5 text-brand-gold" aria-label="demo mode">
          DEMO
        </span>
      )}
    </div>
  );
}
