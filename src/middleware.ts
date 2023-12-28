import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
    let cookie = req.cookies.get('token')
    const isAuthUser = cookie?.value.length ? true :false
    const protectedRoutes = ["/login","/register"]
    const protectedAdminRoutePrefix  = "/admin-view"
    const isProtectedAdminRoute = req.nextUrl.pathname.startsWith(protectedAdminRoutePrefix)
    
    if (isAuthUser && protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }else if(!isAuthUser && isProtectedAdminRoute){
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
