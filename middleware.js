
import { NextRequest } from "next/server"
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {

  // we'll use NY, NY as a default in lieu of good data 
  const middlewareRequest = new MiddlewareRequest(req)
  const longitude = req.geo.longitude ? req.geo.longitude : "-74.0060" 
  const latitude = req.geo.latitude ? req.geo.latitude : "40.7128"     
  const response = await middlewareRequest.next();
  console.log("MIDDLEWARE RESPONSE", response)
  response.setPageProp("latitude", latitude)
  response.setPageProp("longitude", longitude)
  return response;
}