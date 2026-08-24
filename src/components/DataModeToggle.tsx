"use client";

import { useEffect, useState } from "react";

type ModeState = { mode: "dummy" | "real"; demo: boolean };

/** 기본 표시는 Real. 첫 방문 시 미들웨어/API가 real 쿠키를 심습니다. */
export default function DataModeToggle() {
  const [state, setState] = useState<ModeState>({ mode: "real", demo: true });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/mode")
      .then((r) => r.json())
      .then((s: ModeState) =>
        setState({ mode: s.mode === "dummy" ? "dummy" : "real", demo: Boolean(s.demo) })
      )
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
        setState(await r.json());
        window.location.reload();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="hidden sm:flex items-center gap-1 rounded-full border border-brand-line bg-brand-paper px-1 py-1 text-[0.72rem] font-bold"
      title={state.mode === "real" ? "Real: Midwest originals" : "Dummy: AI mockup images"}
    >
      {(["dummy", "real"] as const).map((m) => (
        <button
          key={m}
          onClick={() => switchTo(m)}
          disabled={busy}
          className={`px-2.5 py-1 rounded-full transition ${
            state.mode === m ? "bg-brand-navy text-white" : "text-brand-muted hover:text-brand-navy"
          }`}
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
