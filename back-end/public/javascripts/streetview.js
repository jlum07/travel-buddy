const fetch = require("node-fetch");
const apikey = require("./apikey.js");

module.exports = async function(lat, lng) {
  let urlArray = [];

  for (let i = 0; i < 4; i++) {
    const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&fov=90&heading=${i * 90}&pitch=0&key=${process.env.GOOGLE_MAPS_API_KEY || apikey.API_KEY}`;
    console.log("hi")
    let response = await fetch(url);
    console.log(response)
    let json = await response.blob()
    //console.log(json)
    urlArray.push(json)
  }
  return urlArray
};
