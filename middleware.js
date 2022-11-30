
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(req) {

  // we'll use NY, NY as a default in lieu of good data 
  try {
    const longitude = req.geo.longitude ? req.geo.longitude : "-74.0060" 
    const latitude = req.geo.latitude ? req.geo.latitude : "40.7128" 
    const middlewareRequest = new MiddlewareRequest(req)
    const response = await middlewareRequest.next();
    console.log(response)
    response.setPageProp("latitude", latitude)
    response.setPageProp("longitude", longitude)
    return response;
  } catch(err) {
    console.log(err)

  }
}