const fetch = require("node-fetch");
const apikey = require("./apikey.js");
const getSnapChats = require("./getSnapChats");
const getInstagrams = require("./getInstagrams");

module.exports = async function(placeElement, location) {
  //Using Google Places API, search places by the place keyword from TA to return the most likely response
  //and the coordinates/address
  let response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      location.lat
    },${location.lng}&radius=15000&keyword=${placeElement.title}&key=${
      apikey.API_KEY
    }`
  );

  //Convert to JSON
  let resultJSON = await response.json();
  //console.log(resultJSON)

  //If zero returns for POI, return an empty object
  if (resultJSON.status === "ZERO_RESULTS") {
    return {};
  }

  //Add location data, plus full name
  placeElement.location = resultJSON.results[0].geometry.location;
  placeElement.title = resultJSON.results[0].name;

  //Adds the closest "address"
  //Could be improved by implenting a fetch to the google autocompete for places API
  placeElement.address = resultJSON.results[0].vicinity;

  //Get snapchats based on the place coordinates
  placeElement.snapchat = await getSnapChats(
    placeElement.location.lat,
    placeElement.location.lng
  );

  // placeElement.instagrams = await getInstagrams(
  //   placeElement.location.lat,
  //   placeElement.location.lng
  // );

  return placeElement;
};
