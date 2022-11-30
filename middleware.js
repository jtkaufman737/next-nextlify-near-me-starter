
import { NextRequest } from "next/server"
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {
  // we'll use NY, NY as a default in lieu of good data 
  if(req.nextUrl.pathname == "/api/locations") {
    console.log("REQ", req)
    console.log(req.nextUrl)
    const middlewareRequest = new MiddlewareRequest(req)
    console.log(middlewareRequest)
    const longitude = req.geo.longitude ? req.geo.longitude : "-74.0060" 
    const latitude = req.geo.latitude ? req.geo.latitude : "40.7128"     
    console.log("LONGITUDE, LATITUDE RIGHT NOW")
    console.log(longitude, latitude)
    const response = await middlewareRequest.next();
    // console.log("MIDDLEWARE RESPONSE", response)

    console.log("RESPONSE AFTER SET PAGE PROP", response, response.body)
    return response;
  }
}