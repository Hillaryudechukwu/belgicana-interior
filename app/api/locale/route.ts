import { NextRequest, NextResponse } from 'next/server';
export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale');
  if (locale !== 'en' && locale !== 'pt') return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  const path = request.nextUrl.searchParams.get('returnTo') || '/';
  const destination = new URL(path, request.url);
  // Only allow redirects within this site, including encoded or backslash variants.
  const safe = path.startsWith('/') && destination.origin === request.nextUrl.origin;
  const response = NextResponse.redirect(safe ? destination : new URL('/', request.url), 303);
  response.cookies.set('locale', locale, { httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: 60 * 60 * 24 * 365 });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
