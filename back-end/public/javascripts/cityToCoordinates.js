const fetch = require("node-fetch");
const API_KEY = require('../../apikey.js');


module.exports = function(cityName){
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&type=locality&key=${API_KEY.API_KEY}`)
  .then((res)=>{
    return res.json();
  })
  .then((json)=>{
    let lat = json.results[0].geometry.location.lat
    let lng = json.results[0].geometry.location.lng
    return { lat, lng };
  })
  .catch((error)=>{console.log(error);})  
}


