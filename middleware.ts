import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' });

  if (pathname.startsWith('/checkout') || pathname.startsWith('/orders')) {
    if (token) return NextResponse.next();

    const { protocol, host, pathname } = req.nextUrl;

    return NextResponse.redirect(`${protocol}//${host}/auth/login?previousPath=${pathname}`);
  }

  if (pathname.startsWith('/admin')) {
    if ((token as { user: { role: string } }).user.role === 'admin') return NextResponse.next();

    const { protocol, host } = req.nextUrl;

    return NextResponse.redirect(`${protocol}//${host}/`);
  }

  if (pathname.startsWith('/auth')) {
    if (token) {
      const { protocol, host, search } = req.nextUrl;
      const previousPath = search.split('previousPath=')[1]?.split('%2F').join('/') || '';
      return NextResponse.redirect(`${protocol}//${host}${previousPath}`);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/checkout/:path*', '/auth/:path*', '/orders/:path*', '/admin/:path*'],
};
