
import { NextRequest } from "next/server"
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {
  // we'll use NY, NY as a default in lieu of good data 
  console.log("IN MIDDLEWARE FILE", req)
  const middlewareRequest = new MiddlewareRequest(req)
  const response = await middlewareRequest.next();
  return response;
}