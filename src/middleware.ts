import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MODE_COOKIE = "mu_data_mode";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Default Real mode on first visit
  const hasMode = Boolean(req.cookies.get(MODE_COOKIE)?.value);
  const mode = req.cookies.get(MODE_COOKIE)?.value ?? "real";

  // 2) Dummy image rewrite
  if (mode === "dummy") {
    const prefixes = ["/media/img/", "/media/images/", "/media/innoboard/"];
    if (prefixes.some((p) => pathname.startsWith(p))) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.replace(/^\/media\//, "/media/dummy/");
      const res = NextResponse.rewrite(url);
      if (!hasMode) {
        res.cookies.set(MODE_COOKIE, "real", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
      }
      return res;
    }
  }

  // 3) /ko/* → same page without prefix (browser URL keeps /ko)
  if (pathname.startsWith("/ko/") && pathname.length > 4) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    const res = NextResponse.rewrite(url);
    if (!hasMode) {
      res.cookies.set(MODE_COOKIE, "real", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return res;
  }

  const res = NextResponse.next();
  if (!hasMode) {
    res.cookies.set(MODE_COOKIE, "real", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
