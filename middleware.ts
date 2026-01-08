import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths you want to protect by role
const protectedRoutes = [
    { path: '/provider', role: 'PROVIDER' },
    { path: '/customer', role: 'CUSTOMER' },
];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const pathname = req.nextUrl.pathname;

    // Not logged in: block protected routes
    if (!token && protectedRoutes.some(route => pathname.startsWith(route.path))) {
        return NextResponse.redirect(new URL('/logIn', req.url));
    }

    // Logged in: check role access
    for (const route of protectedRoutes) {
        if (pathname.startsWith(route.path)) {
            if (token?.role !== route.role) {
                return NextResponse.redirect(new URL('/unauthorized', req.url));
            }
        }
    }

    return NextResponse.next();
}
