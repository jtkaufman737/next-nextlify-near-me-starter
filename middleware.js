
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const { nextUrl: url, geo } = req
  // we'll use NY, NY as a default in lieu of good data 
  const longitude = geo.longitude ? geo.longitude : "-74.0060" 
  const latitude = geo.lattitude ? geo.latitude : "40.7128" 
  url.searchParams.set('longitude', longitude)
  url.searchParams.set('latitude', latitude)
  
  return NextResponse.rewrite(url)
}