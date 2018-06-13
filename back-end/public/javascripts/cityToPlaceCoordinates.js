const tripAdvisorScraper = require("./tripAdvisorScraper");
const placeToCoordinates = require("./placeToCoordinates");

module.exports = async function(searchInput) {
  //Pass the city name into it. The only reason of the full city details is for the location
  let places = await tripAdvisorScraper(
    searchInput.address_components[0].long_name
  );

  let top_poi = places.top_poi.map(element => {
    //Pass the name of the attraction, and the location of the city to bias the results
    return placeToCoordinates(element, searchInput.geometry.location);
  });

  let museum_poi = places.museum_poi.map(element => {
    //Pass the name of the attraction, and the location of the city to bias the results
    return placeToCoordinates(element, searchInput.geometry.location);
  });

  let food_poi = places.food_poi.map(element => {
    //Pass the name of the attraction, and the location of the city to bias the results
    return placeToCoordinates(element, searchInput.geometry.location);
  });

  let nightlife_poi = places.nightlife_poi.map(element => {
    //Pass the name of the attraction, and the location of the city to bias the results
    return placeToCoordinates(element, searchInput.geometry.location);
  });

  return{top_poi: await Promise.all(top_poi),
    museum_poi: await Promise.all(museum_poi),
    food_poi: await Promise.all(food_poi),
    nightlife_poi: await Promise.all(nightlife_poi)
  };
};
