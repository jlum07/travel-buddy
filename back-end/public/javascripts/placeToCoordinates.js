const fetch = require("node-fetch");
const apikey = require('../../apikey.js');

module.exports = function(placeElement) {
  return new Promise(function(resolve, reject) {
    console.log("hi")
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.6532,-79.3832&radius=15000&keyword=${placeElement.title}&key=${apikey.key}`
    )
      .then(response => {
        return response.json()
      })
      .then(function(sup) {
        placeElement.location = sup.results[0].geometry.location
        resolve(placeElement);
      })
  });
};
