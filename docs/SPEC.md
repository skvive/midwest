# Midwest University — Website Upgrade Specification

납품일: 2026-08-24 · 스택: Next.js 14 (App Router) · Tailwind CSS · Neon DB(PostgreSQL) · Vercel

---

## 1. Executive Summary

미주리주 세인트루이스 권역(Wentzville) 소재 미드웨스트대학교의 공식 웹사이트를 Classic ASP
기반에서 Next.js 14 기반으로 전면 재구축했다. **원본 사이트(midwest.edu)의 텍스트·이미지
자산을 전량 이관**(146페이지 크롤링·구조화, 이미지 217점 웹 최적화)했으며, 디자인은 세계명문대
10곳(MIT·Stanford·Harvard·Princeton·Yale·UChicago·Oxford·Cambridge·Imperial·Caltech)의
IA·UX 패턴을 벤치마킹한 **시안 D(Fusion)** — B안의 이미지 밀도 × C안의 콘텐츠 구성 —
를 적용했다. 정적 생성(SSG) 128페이지, 게시판 3종, [Dummy/Real] 데이터 전환 스위치,
REST API, 404/500 바운더리를 포함하며 `next build` 통과와 1440/390px 실렌더링 검증을 마쳤다.

## 2. UX Analysis & Upgraded Site Map

### 2-1. 원본 진단
- 텍스트가 이미지에 구워진 1500×500 배너 슬라이더 중심 홈 → 반응형·접근성·SEO 취약
- 데스크톱/모바일 이중 페이지(`screen=` 쿼리 분기) → 유지보수 이중화
- 8대 메뉴 병렬 나열로 핵심 여정(입학지원) 매몰

### 2-2. UX 인지 알고리즘 적용
- **Serial Position Effect**: 헤더 첫 항목(About)과 마지막 고정 CTA(Apply)에 핵심 여정 배치
- **Jakob's Law**: 명문대 표준 패턴(오디언스 바, 프로그램 파인더, 뉴스 카드)을 그대로 따름
- **Fitts's Law**: 전 인터랙션 타깃 44px+, 모바일 풀스크린 시트 내비
- **Cognitive Load**: 홈을 히어로→미션→스토리→캠퍼스→프로그램→뉴스→통계→방문 8단계 단일 흐름으로 감량

### 2-3. 신규 사이트맵 (원본 146페이지 → 119 콘텐츠 라우트 + 보드/파인더)
```
/                              홈 (시안 D Fusion)
/about/*                       15페이지 (overview·mission·president·history·global-network …)
/academics/*                   파인더(/academics/programs, level 쿼리 필터) + 캘린더·교수진 등
/academics/programs/{esl|bachelor|master|doctoral}/{slug}   프로그램 상세 44종 SSG
/admissions/*                  13페이지 (requirements·tuition·scholarship·sevis·faq …)
/student-life/*                일반 페이지 + official-bulletin·gallery-news 게시판(목록/상세)
/research/*                    MIRI·J-1 7페이지 + miri-news 게시판
/language-center/* /alumni/* /library/* /media/*
/api/mode /api/reset /api/posts
404 / 500 바운더리
```
상세 페이지는 `generateStaticParams` SSG(빌드 시 128페이지), 게시판 목록/상세는 시드 데이터
기반 SSG + DB 연동 시 동적 API 사용 가능.

## 3. UI/UX Design System & Wireframe Concept

- **베이스**: 화이트톤(#fff / paper #faf9f6) + 딥네이비 #122b52 + 골드 #b98a2f (시안 D)
- **타이포**: 제목 Georgia 세리프 + 본문 Pretendard 스택, `word-break: keep-all`,
  제목 letter-spacing -0.025em/행간 1.3, 본문 -0.015em/1.6
- **유동형 프레임**: 고정 px 배제 — `clamp()` 타입 스케일,
  래퍼 `min(100% - clamp(2rem,6vw,5rem), 80rem)`
- **홈 구성**: 92vh 풀블리드 히어로(대각선 이중 스크림 + 골드 하이라이트 레이어 + 글래스
  팩트카드) → 미션 인용 밴드 → 포토 스토리 2단 → 캠퍼스 포토 모자이크 → 넘버링 프로그램
  카드(포토 썸네일) → 포토 뉴스 카드 4종 → 네이비 통계 밴드 → 파노라마 방문 CTA
- **모바일**: 풀스크린 시트 내비(아코디언), 터치 타깃 44px+, 팩트카드 모바일 숨김
- **이미지 자산**: 원본 217점을 1600px·JPEG q72로 재규격(총 29MB, `public/media/` 원경로 보존)
- **AI 이미지 교체 가이드**(추후 고품질 실사풍 대체 시 프롬프트 예시):
  - 히어로: "wide-angle photo of a small private university campus entrance in Missouri at
    golden hour, brick gateway sign, manicured lawn, American flag, warm natural light, 16:9"
  - 프로그램 카드: "students in a small seminar classroom, professor nearby, natural window
    light, documentary style, 4:3"
  - 도서관: "quiet university library reading room, wooden shelves, warm lamps, 4:3"

## 4. Technical Specification

- **스택**: Next.js 14.2 App Router · TypeScript · Tailwind CSS 3.4 · @neondatabase/serverless
- **데이터 계층**: `src/lib/data.ts` = In-Memory SSOT(전 행 `is_dummy: true`) ↔
  `db/seed.sql` 1:1 동기화. `db/schema.sql` — posts 테이블(공통 컬럼 `is_dummy BOOLEAN`,
  `deleted_at TIMESTAMPTZ`), 활성 행 부분 인덱스, `active_posts` 뷰, `app_state` 키·값 저장
- **[Dummy/Real] 스위치** (우상단 상시):
  - SSOT: `app_state.data_mode` — DB 영속, 재배포 후 유지
  - Real 전환: 프론트 2단계 확인(confirm + "RESET" 입력) → API `confirm:"RESET"` 검증 →
    `sql.transaction()`으로 is_dummy 행 Soft Delete + app_state 갱신 원자 실행
  - Dummy 복귀: `deleted_at = NULL` 복원 트랜잭션
  - Hard Delete: `POST /api/reset` + `x-admin-key` 헤더(관리자 전용, `ADMIN_KEY` env)
  - `DATABASE_URL` 미설정 시: In-Memory 폴백 + 토글 DEMO 배지(전환 비활성)
- **REST API**: `GET/POST /api/mode` · `POST /api/reset` · `GET /api/posts?board=`
- **라우팅 매트릭스**: URL 쿼리 SSOT 필터(프로그램 파인더 `?level=`), 404/500 바운더리,
  전 페이지 정적 생성으로 새로고침 시 상태 보존
- **배포**: `scripts/deploy.mjs` — `midwestuniv.vercel.app`, 점유 시 `midwestuniv0,1,2…` 폴백
- **환경변수**: `DATABASE_URL`(Neon), `ADMIN_KEY`(Hard Delete)
- **검증 결과**: `next build` 통과(128 정적 페이지) · Playwright 실렌더링 스크린샷
  (데스크톱 1440 / 모바일 390) — 홈·프로그램 파인더·DBA 상세·게시판·미션 페이지 확인

## 5. Client Q&A Queue

1. **실데이터 연결**: Neon `DATABASE_URL` 발급 후 `db/schema.sql` → `db/seed.sql` 실행만 하면
   게시판이 DB 모드로 동작합니다. 콘솔 접속 정보를 어떤 채널로 전달받을까요? (시크릿은
   채팅이 아닌 보안 입력으로 받는 것을 권장)
2. **Apply Online**: 현재 내부 Requirements 페이지로 연결되어 있습니다. 원본처럼 Populi
   외부 지원 시스템으로 직결할까요?
3. **국문 사이트**: 원본은 midwest.kr 별도 운영입니다. 이번 결과물에 KR/EN 토글(이중 언어
   라우팅 `/ko/*`)을 추가할까요?
4. **동영상 자산**: 원본 mp4 4종(졸업식·콘서트·40주년·소개)은 용량 관계로 미포함, URL만
   매니페스트에 보존했습니다. 재인코딩 포함 여부를 알려주세요.
5. **실사진 교체**: 3장의 AI 프롬프트 가이드로 고품질 이미지를 생성·교체할 수 있습니다.
   교체 우선순위(히어로/프로그램/뉴스)를 지정해 주세요.
