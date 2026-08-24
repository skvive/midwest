# Midwest University — Upgraded Website

원본 midwest.edu의 콘텐츠·이미지를 전량 이관하고 세계명문대 벤치마킹 디자인(시안 D Fusion)을
적용한 Next.js 14 사이트. 상세 명세는 `docs/SPEC.md` 참조.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드 (SSG 128 pages)
```

## DB 연결 (선택)

```bash
# Neon 콘솔에서 db/schema.sql → db/seed.sql 실행 후
export DATABASE_URL="postgres://..."
export ADMIN_KEY="..."        # Hard Delete용
```
미설정 시 In-Memory 데모 모드로 동작(우상단 토글에 DEMO 배지).

## 배포

```bash
export VERCEL_TOKEN="..."
npm run deploy     # midwestuniv.vercel.app (점유 시 midwestuniv0,1,2… 폴백)
```
