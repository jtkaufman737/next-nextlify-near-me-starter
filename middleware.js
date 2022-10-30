import { NextResponse } from "next/server";

export function middleware(req) {

  console.log("request > > > > > > >", req);

  const nextUrl = req.nextUrl;
  const { nextUrl: url, geo } = req;
  const country = geo.country || "NULL";
  const city = geo.city || "NULL";
  const region = geo.region || "NULL";
  const timezone = geo.timezone || "NULL";
  const ip = geo.ip || "NULL";
  console.log(country, city, region) 
  NextResponse.rewrite(nextUrl);
  return NextResponse.rewrite(nextUrl);
}