const axios = require('axios');

export default async function handler(req, res) {
  try {
    const { longitude, latitude } = req.query 
    console.error("iN LOCATIONS ENDPOINT", req)
    const baseUrl = process.env.NEXT_PUBLIC_API_TARGET
    const url = `${baseUrl}${latitude},${longitude}&per_page=10`
    const locations = await axios.get(url).then(res => res.data)
    return res.status(200).json(locations)
  } catch(e) {
    console.error("YO I ERRORED IN THE LOCATION ENDPOINT", e)
  }
}