const tripAdvisorScraper = require("./tripAdvisorScraper");
const placeToCoordinates = require("./placeToCoordinates");

module.exports = async function(searchInput) {
  //Pass the city name into it. The only reason of the full city details is for the location
  let places = await tripAdvisorScraper(
    searchInput.address_components[0].long_name
  );

  console.log("searchInput", searchInput);
  console.log("place two", places)
  let promiseArray = places.map(element => {
    console.log("searchInput.geometry", searchInput.geometry)
    //Pass the name of the attraction, and the location of the city to bias the results
    return placeToCoordinates(element, searchInput.geometry.location);
  });

  return await Promise.all(promiseArray);
};
