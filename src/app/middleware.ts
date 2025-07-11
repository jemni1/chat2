// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sb-access-token')?.value

  // Si pas de token → redirection vers /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Appliquer le middleware uniquement à certaines routes
export const config = {
  matcher: ['/chat'], // ajoute ici toutes les pages à protéger
}
