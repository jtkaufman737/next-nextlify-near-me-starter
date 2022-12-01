
import { NextRequest } from "next/server"
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {
  // we'll use NY, NY as a default in lieu of good data 
  try {
    const pathname = req.nextUrl.pathname;
    console.log("PATHNAME", pathname)
    const middlewareRequest = new MiddlewareRequest(req)
    const { latitude, longitude } = req.geo
    console.log("LONGITUDE, LATITUDE: ", longitude, latitude)
    const response = await middlewareRequest.next();
    response.setPageProp("latitude", latitude)
    response.setPageProp("longitude", longitude)
    return response;
} catch(err) {
    console.log("MIDDLEWARE ERR", err)
}
}