const tripAdvisorScraper = require("./tripAdvisorScraper");
const placeToCoordinates = require("./placeToCoordinates");

module.exports = function(searchInput) {
  return new Promise(function(resolve, reject) {
    tripAdvisorScraper(searchInput)
      .then(places => {
        //console.log("here");
        console.log(places);
        let promiseArray = places.map(element => {
          let something = placeToCoordinates(element);

          return something.then(value => {
            console.log(value);
            return value;
          });
        });
        return Promise.all(promiseArray).then(results => {
          //console.log(results)
          return results
        })
      })
      .then(elements => {
        //console.log(elements);
        resolve(JSON.stringify(elements));
      });
  });
};
