import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
 
  const accessToken = req.cookies.get("accessToken")?.value;

 
  if (!accessToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/auth/login", req.url);
    console.log("Redirecting to:", loginUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); 
}


export const config = {
  matcher: ["/dashboard:path*"], 
};
