const tripAdvisorScraper = require("./tripAdvisorScraper");
const placeToCoordinates = require("./placeToCoordinates");

module.exports = function(searchInput) {
  return new Promise(function(resolve, reject) {
    //Pass the city name into it. The only reason of the full city details is for the location
    tripAdvisorScraper(searchInput.address_components[0].long_name)
      .then(places => {
        let promiseArray = places.map(element => {
          //Pass the name of the attraction, and the location of the city to bias the results
          return placeToCoordinates(element, searchInput.geometry.location);
        });

        return Promise.all(promiseArray).then(results => {
          return results;
        });
      })
      .then(elements => {
        resolve(elements);
      });
  });
};
