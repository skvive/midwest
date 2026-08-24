# Midwest University — Upgraded Website

원본 midwest.edu의 콘텐츠·이미지를 전량 이관하고 세계명문대 벤치마킹 디자인(시안 D Fusion)을
적용한 Next.js 14 사이트. 상세 명세는 `docs/SPEC.md` 참조.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드 (SSG 128 pages)
```

## 데이터 / 이미지 모드

우상단 **[Dummy / Real]** 스위치:

- **Real** (기본): 원본 Midwest 이미지 (`/media/img/...` 등). 게시 시드 데이터 유지.
- **Dummy**: AI 시안 이미지 (`/media/dummy/...`). 더미 게시글을 Soft Delete 하지 않음.

DB(`DATABASE_URL`) 연결 시 모드는 Neon `app_state`에 저장되고, 미연결 시에도 쿠키로 이미지 모드만 전환 가능합니다.

## 배포

```bash
export VERCEL_TOKEN="..."
npm run deploy     # midwestuniv.vercel.app (점유 시 midwestuniv0,1,2… 폴백)
```
