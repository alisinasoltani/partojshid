import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('jeyshid')?.value;
  const { pathname } = request.nextUrl;

  // Protect /panel/*
  if (pathname.startsWith('/panel')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Optional: validate token with /api/auth/me if you want extra security
  }

  // Redirect logged-in users away from login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/panel', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/panel/:path*', '/login'],
};