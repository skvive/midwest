import Link from "next/link";
import { BOARD_META, posts, type BoardKey } from "@/lib/data";
import { SECTION_HERO } from "@/lib/content";

export function BoardList({ board, top }: { board: BoardKey; top: string }) {
  const meta = BOARD_META[board];
  const items = posts
    .filter((p) => p.board === board && !p.deleted_at)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section
        className="relative flex items-end min-h-[15rem] lg:min-h-[19rem] bg-cover bg-center"
        style={{ backgroundImage: `url('${SECTION_HERO[top]}')` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,26,50,.35), rgba(11,26,50,.78))" }} />
        <div className="wrap relative z-10 pb-8 text-white">
          <nav className="text-[0.8rem] opacity-85 mb-2">
            <Link href="/">Home</Link> &gt; {meta.crumb.join(" > ")}
          </nav>
          <h1 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            {meta.title}
          </h1>
        </div>
      </section>

      <div className="wrap py-10 lg:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`${meta.route}/${p.id}`}
              className="bg-white border border-brand-line rounded-md overflow-hidden transition hover:shadow-xl"
            >
              {p.image && (
                <span className="block aspect-video bg-cover bg-center border-b-[3px] border-brand-navy" style={{ backgroundImage: `url('${p.image}')` }} />
              )}
              <span className="block p-5">
                <span className="text-xs text-brand-muted">{p.date}</span>
                <span className="block font-serif font-bold text-brand-navy mt-1 leading-snug">{p.title}</span>
                <span className="block text-sm text-brand-slate mt-2 line-clamp-2">{p.body}</span>
              </span>
            </Link>
          ))}
        </div>
        <p className="text-xs text-brand-muted mt-8">
          * 시드 게시글은 디자인 참조용으로 유지됩니다. 우상단 [Dummy/Real]은 이미지 자산 전환용이며
          더미 데이터를 삭제하지 않습니다. (Real = Midwest 원본 / Dummy = AI 시안)
        </p>
      </div>
    </>
  );
}

export function BoardDetail({ board, id, top }: { board: BoardKey; id: number; top: string }) {
  const meta = BOARD_META[board];
  const post = posts.find((p) => p.board === board && p.id === id && !p.deleted_at);
  if (!post) return null;

  return (
    <>
      <section
        className="relative flex items-end min-h-[13rem] bg-cover bg-center"
        style={{ backgroundImage: `url('${SECTION_HERO[top]}')` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,26,50,.4), rgba(11,26,50,.8))" }} />
        <div className="wrap relative z-10 pb-8 text-white">
          <nav className="text-[0.8rem] opacity-85 mb-2">
            <Link href="/">Home</Link> &gt; {meta.crumb.join(" > ")}
          </nav>
          <h1 className="font-serif font-bold" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>
            {post.title}
          </h1>
        </div>
      </section>
      <article className="wrap max-w-[52rem] py-10 lg:py-14">
        <div className="text-sm text-brand-muted mb-6">
          {meta.title} · {post.date}
        </div>
        {post.image && <img src={post.image} alt="" className="rounded-md mb-6 w-full" />}
        <p className="text-brand-slate leading-relaxed whitespace-pre-line">{post.body}</p>
        <div className="mt-10">
          <Link href={meta.route} className="btn border border-brand-navy text-brand-navy">
            ← {meta.title} 목록
          </Link>
        </div>
      </article>
    </>
  );
}

export function boardStaticIds(board: BoardKey) {
  return posts.filter((p) => p.board === board).map((p) => ({ id: String(p.id) }));
}
