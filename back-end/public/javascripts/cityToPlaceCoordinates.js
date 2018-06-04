const tripAdvisorScraper = require("./tripAdvisorScraper");
const placeToCoordinates = require("./placeToCoordinates");

module.exports = function(searchInput) {
  return new Promise(function(resolve, reject) {
    tripAdvisorScraper(searchInput)
      .then(places => {
        let promiseArray = places.map(element => {
          return placeToCoordinates(element);
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
