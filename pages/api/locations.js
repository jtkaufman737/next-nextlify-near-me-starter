const axios = require('axios');

export default async function handler(req, res) {
  /* ok here I need to plug into the geolocation data */ 
  const zip = 10001
  const url = `${process.env.NEXT_PUBLIC_API_TARGET}${zip}&per_page=100`
  const locations = await axios.get(url).then(res => {return res.data})
  return res.status(200).json(locations)
}