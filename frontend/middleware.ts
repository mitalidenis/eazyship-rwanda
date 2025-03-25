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
  const publicPaths = ['/auth/login', '/']

  // Admin dashboard routes
  const adminPaths = ['/admin/dashboard', '/admin/shipments', '/admin/settings']

  // Check if the path is a public path
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Allow access to admin paths if token exists
  if (adminPaths.includes(path) && token) {
    return NextResponse.next()
  }

  // Redirect to login if no token and not an admin path
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*', 
    '/dashboard/:path*',
    '/auth/login'
  ]
}