import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "mu_data_mode";

/** Dummy 모드일 때 /media/img|images|innoboard → /media/dummy/... (AI 시안 자산) */
export function middleware(req: NextRequest) {
  const mode = req.cookies.get(COOKIE)?.value ?? "real";
  if (mode !== "dummy") return NextResponse.next();

  const { pathname } = req.nextUrl;
  const prefixes = ["/media/img/", "/media/images/", "/media/innoboard/"];
  const hit = prefixes.find((p) => pathname.startsWith(p));
  if (!hit) return NextResponse.next();

  const rewritePath = pathname.replace(/^\/media\//, "/media/dummy/");
  const url = req.nextUrl.clone();
  url.pathname = rewritePath;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/media/img/:path*", "/media/images/:path*", "/media/innoboard/:path*"],
};
