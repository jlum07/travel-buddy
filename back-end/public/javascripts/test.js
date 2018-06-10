const fetch = require("node-fetch");
const apikey = require("../../apikey.js");
const getSnapChats = require("./getSnapChats");
const getInstagrams = require("./getInstagrams");



//Using Google Places API, search places by the place keyword from TA to return the most likely response
//and the coordinates/address
fetch(
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
    location.lat
  },${location.lng}&radius=15000&keyword=${placeElement.title}&key=${
    apikey.API_KEY
  }`
).then((response)=>{
  console.log(response);
})


