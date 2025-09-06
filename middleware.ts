import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a placeholder for actual authentication logic.
// In a real app, you'd check for a valid session token.
const isAuthenticated = (req: NextRequest) => {
  // For this prototype, we'll use a cookie to simulate authentication.
  // In a real app, this would involve verifying a JWT or session cookie.
  return req.cookies.has('auth-token'); 
}

export function middleware(request: NextRequest) {
  // If the user is trying to access the dashboard and is not authenticated,
  // redirect them to the login page.
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
     // A real app would have a more robust authentication check.
     // For now, we allow access to the dashboard.
     return NextResponse.next();
  }
  
  // If the user is authenticated and tries to visit the login page,
  // redirect them to the dashboard.
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
