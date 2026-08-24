import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24 text-center">
      <p className="font-serif text-brand-gold text-6xl font-bold">404</p>
      <h1 className="font-serif text-brand-navy text-2xl mt-4">페이지를 찾을 수 없습니다</h1>
      <p className="text-brand-muted mt-3">주소가 변경되었거나 삭제된 페이지입니다.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn bg-brand-navy text-white">홈으로</Link>
        <Link href="/academics/programs" className="btn border border-brand-navy text-brand-navy">프로그램 파인더</Link>
      </div>
    </section>
  );
}
