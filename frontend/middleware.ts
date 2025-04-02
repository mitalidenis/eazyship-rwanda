import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  const path = req.nextUrl.pathname

  // Public routes that don't require authentication
  const publicPaths = ['/auth/login', '/', '/auth/signup']

  // Admin dashboard routes
  const adminPaths = ['/admin/dashboard/page', '/admin/shipments', '/admin/settings']

  // User dashboard routes
  const userPaths = ['/dashboard', '/dashboard/settings']

  // If the path is public, allow access
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Redirect to login if no token exists for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Admin route protection
  if (adminPaths.includes(path)) {
    if (token.role !== 'ADMIN') {
      console.log('Unauthorized admin access attempt:', token)
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // User route protection
  if (userPaths.includes(path)) {
    if (token.role !== 'USER' && token.role !== 'ADMIN') {
      console.log('Unauthorized user access attempt:', token)
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*', 
    '/admin/:path*', 
    '/auth/login', 
    '/auth/signup'
  ]
}