import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token") || "";

  if (pathname.startsWith("/checkout")) {
    const isTokenValid = await verifyTokenValid(token);

    if (isTokenValid) return NextResponse.next();

    const { protocol, host, pathname } = req.nextUrl;

    return NextResponse.redirect(
      `${protocol}//${host}/auth/login?previousPath=${pathname}`
    );
  }

  if (pathname.startsWith("/auth")) {
    const isTokenValid = await verifyTokenValid(token);

    if (isTokenValid) {
      const { protocol, host } = req.nextUrl;
      return NextResponse.redirect(`${protocol}//${host}/ `);
    }

    return NextResponse.next();
  }
}

const verifyTokenValid = async (token: string) => {
  try {
    await jose.jwtVerify(
      token || "",
      new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const config = {
  matcher: ["/checkout/:path*", "/auth/:path*"],
};
