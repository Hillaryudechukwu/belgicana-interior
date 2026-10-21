import { NextRequest, NextResponse } from 'next/server';
export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale');
  if (locale !== 'en' && locale !== 'pt') return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  const path = request.nextUrl.searchParams.get('returnTo') || '/';
  // Keep Location relative: behind Render, request.url can contain 0.0.0.0:10000.
  // Normalize against a fixed origin to reject external and protocol-relative URLs.
  let location = '/';
  try {
    const destination = new URL(path, 'https://locale.invalid');
    if (path.startsWith('/') && destination.origin === 'https://locale.invalid' && !destination.pathname.startsWith('//')) {
      location = destination.pathname + destination.search + destination.hash;
    }
  } catch {
    // Malformed destinations return to the home page.
  }
  const response = new NextResponse(null, { status: 303, headers: { Location: location } });
  response.cookies.set('locale', locale, { httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: 60 * 60 * 24 * 365 });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
