
import { NextRequest } from "next/server"
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {
  // we'll use NY, NY as a default in lieu of good data 
  
  const pathname = req.nextUrl.pathname;
  console.log("PATHNAME", pathname)
  const middlewareRequest = new MiddlewareRequest(req)
  const { latitude, longitude } = req.geo
  console.log("LONGITUDE, LATITUDE: ", longitude, latitude)
  const response = await middlewareRequest.next();
  response.setPageProps("latitude", latitude)
  response.setPageProps("longitude", longitude)
  return response;
}