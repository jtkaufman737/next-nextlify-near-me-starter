
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // we'll use NY, NY as a default in lieu of good data 
  const longitude = req.geo.longitude ? req.geo.longitude : "-74.0060" 
  const latitude = req.geo.lattitude ? req.geo.latitude : "40.7128" 
  const middlewareRequest = new MiddlewareRequest(req)
  const response = await middlewareRequest.next();
  console.log(response)
  return response;
}