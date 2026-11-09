import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const reference = new URL(req.url).searchParams.get('reference');
  const target = new URL('/payment/callback', process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mellsfashion.co.ke');
  if (reference) target.searchParams.set('reference', reference);
  return NextResponse.redirect(target);
}
