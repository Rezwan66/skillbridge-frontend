import { NextRequest, NextResponse } from 'next/server';
import { userService } from './services/user.service';

import { Role } from './types/constants.type';
import { Roles } from './constants';
import { ROLE_ROUTES } from './routes/roleRoutes';

// const ALLOWED_ROLES = Object.values(Roles);
const AUTH_ROUTES = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  // const { data } = await userService.getSession();
  // const isAuthenticated = !!data?.user;
  // console.log({ isAuthenticated });

  const sessionToken =
    request.cookies.get('__Secure-better-auth.session_token') ??
    request.cookies.get('better-auth.session_token');

  // console.log('from proxy-->', sessionToken);

  const isAuthenticated = !!sessionToken;

  if (AUTH_ROUTES.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', origin));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, origin),
    );
  }

  // if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
  //   return NextResponse.redirect('/');
  // }

  // const userRole = data?.user?.role as Role;

  // if (!ALLOWED_ROLES.includes(userRole)) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // if (pathname === '/dashboard') {
  //   return NextResponse.next();
  // }

  // to check if the user can access a route
  // const allowedRoutes = ROLE_ROUTES[userRole] || [];
  // const canAccess = allowedRoutes.some(route => pathname.startsWith(route));

  // if (!canAccess) {
  //   return NextResponse.redirect(new URL('/dashboard', origin));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/login', '/register'],
};
