import { NextResponse } from 'next/server';

const canonicalHostname = 'www.nixoware.com';

export function proxy(request) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const requestHost = forwardedHost || request.headers.get('host') || '';
  const hostname = requestHost.split(',')[0].trim().split(':')[0].toLowerCase();
  const protocol = (forwardedProto || request.nextUrl.protocol).split(',')[0].trim().replace(':', '').toLowerCase();

  if (process.env.NODE_ENV === 'development' && ['localhost', '127.0.0.1'].includes(hostname)) {
    return NextResponse.next();
  }

  if (hostname === canonicalHostname && protocol === 'https') {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.protocol = 'https:';
  canonicalUrl.hostname = canonicalHostname;
  canonicalUrl.port = '';

  return NextResponse.redirect(canonicalUrl, 308);
}
