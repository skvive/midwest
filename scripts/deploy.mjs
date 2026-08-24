#!/usr/bin/env node
/**
 * Vercel 배포 스크립트 — 프로젝트명 midwestuniv 로 배포.
 * 도메인 점유 시 midwestuniv0, midwestuniv1 … 순차 폴백.
 * 사용: VERCEL_TOKEN 환경변수 설정 후 `npm run deploy`
 */
import { execSync } from "node:child_process";

const BASE = "midwestuniv";
const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error("VERCEL_TOKEN 환경변수가 필요합니다.");
  process.exit(1);
}

function tryDeploy(name) {
  try {
    console.log(`\n▶ 배포 시도: ${name}.vercel.app`);
    execSync(
      `npx vercel deploy --prod --yes --token "$VERCEL_TOKEN" --name ${name}`,
      { stdio: "inherit", env: process.env }
    );
    return true;
  } catch {
    return false;
  }
}

let ok = tryDeploy(BASE);
for (let i = 0; !ok && i < 10; i++) ok = tryDeploy(`${BASE}${i}`);
process.exit(ok ? 0 : 1);
