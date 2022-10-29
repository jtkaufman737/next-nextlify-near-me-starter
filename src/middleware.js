import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req) {
    console.log(req)
    const { nextUrl: url, geo } = req
    const country = geo.country || 'US'

    url.searchParams.set('country', country)

    return NextResponse.rewrite(url)
}