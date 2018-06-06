const fetch = require("node-fetch");
const apikey = require("../../apikey.js");
const getSnapChats = require("./getSnapChats");
const getInstagrams = require("./getInstagrams");

module.exports = function(placeElement) {
  return new Promise(function(resolve, reject) {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.6532,-79.3832&radius=15000&keyword=${
        placeElement.title
      }&key=${apikey.key}`
    )
      .then(response => {
        return response.json();
      })
      .then(async function(sup) {
        //console.log(sup)
        placeElement.location = sup.results[0].geometry.location;

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
