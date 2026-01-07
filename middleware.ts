import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths you want to protect by role
const protectedRoutes = [
    { path: '/provider', role: 'PROVIDER' },
    { path: '/customer', role: 'CUSTOMER' },
];

export async function middleware(req: NextRequest) {
    let session = null;
    try {
        const sessionResponse = await fetch(new URL('/api/auth/get-session', req.url), {
            headers: {
                cookie: req.headers.get('cookie') ?? '',
            },
        });
        session = sessionResponse.ok ? await sessionResponse.json() : null;
    } catch (error) {
        session = null;
    }

    const pathname = req.nextUrl.pathname;

    // Not logged in: block protected routes
    if (!session && protectedRoutes.some(route => pathname.startsWith(route.path))) {
        return NextResponse.redirect(new URL('/logIn', req.url));
    }

    // Logged in: check role access
    for (const route of protectedRoutes) {
        if (pathname.startsWith(route.path)) {
            if (session?.user?.role !== route.role) {
                return NextResponse.redirect(new URL('/unauthorized', req.url));
            }
        }
    }

    return NextResponse.next();
}
