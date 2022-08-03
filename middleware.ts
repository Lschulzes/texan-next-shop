import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' });

  if (pathname.startsWith('/checkout')) {
    if (token) return NextResponse.next();

    const { protocol, host, pathname } = req.nextUrl;

    return NextResponse.redirect(`${protocol}//${host}/auth/login?previousPath=${pathname}`);
  }

  if (pathname.startsWith('/auth')) {
    if (token) {
      const { protocol, host } = req.nextUrl;
      return NextResponse.redirect(`${protocol}//${host}/ `);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/checkout/:path*', '/auth/:path*'],
};
