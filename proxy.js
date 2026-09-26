import { NextResponse } from 'next/server';

const canonicalHostname = 'nixoware.com';

export function proxy(request) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const requestHost = forwardedHost || request.headers.get('host') || '';
  const hostname = requestHost.split(',')[0].trim().split(':')[0].toLowerCase();

  if (hostname !== `www.${canonicalHostname}`) {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.protocol = 'https:';
  canonicalUrl.hostname = canonicalHostname;
  canonicalUrl.port = '';

  return NextResponse.redirect(canonicalUrl, 308);
}
