"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="wrap py-24 text-center">
      <p className="font-serif text-brand-gold text-6xl font-bold">500</p>
      <h1 className="font-serif text-brand-navy text-2xl mt-4">일시적인 오류가 발생했습니다</h1>
      <p className="text-brand-muted mt-3">잠시 후 다시 시도해 주세요.</p>
      <button onClick={reset} className="btn bg-brand-navy text-white mt-8">다시 시도</button>
    </section>
  );
}
