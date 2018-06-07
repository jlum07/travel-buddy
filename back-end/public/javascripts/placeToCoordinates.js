const fetch = require("node-fetch");
const apikey = require("./apikey.js");
const getSnapChats = require("./getSnapChats");
const getInstagrams = require("./getInstagrams");

module.exports = function(placeElement, location) {
  return new Promise(function(resolve, reject) {
    console.log("here")
    console.log(placeElement)
    console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=15000&keyword=${
        placeElement.title
      }&key=${apikey.API_KEY}`)
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=15000&keyword=${
        placeElement.title
      }&key=${apikey.API_KEY}`
    )
      .then(async function(response){
        return response.json();
      })
      .then(async function(sup) {
        //console.log(sup)
        //console.log(sup)
        placeElement.location = sup.results[0].geometry.location;
        placeElement.title = sup.results[0].name
        //Adds the closest "address"
        //Could be improved by implenting a fetch to the google autocompete for places API
        placeElement.address = sup.results[0].vicinity;
        console.log(placeElement.location.lat, placeElement.location.lng);

        placeElement.snapchat = await getSnapChats(
          placeElement.location.lat,
          placeElement.location.lng
        );

        console.log("completed snap");

        // try {
        //   placeElement.instagrams = await getInstagrams(
        //     placeElement.location.lat,
        //     placeElement.location.lng
        //   );
        // } catch (e) {
        //   placeElement.instagrams = []
        // }

        console.log("completed insta");

        resolve(placeElement);
      });
  });
};
