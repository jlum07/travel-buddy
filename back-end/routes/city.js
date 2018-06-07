const express = require("express");
const router = express.Router();
const cityToPlaceCoordinates = require("../public/javascripts/cityToPlaceCoordinates");
const cityAutoComplete = require("../public/javascripts/cityAutoComplete");
const torontoSample = require("./sampleData/torontoSample.js");
// const cityChar = require("./sampleData/cityChar.js"); // THIS CRASHES FOR SOME REASON????

router.get("/:city", async (req, res) => {
  //let cityDetails = await cityAutoComplete(req.params.city);

  //console.log(cityDetails.result.address_components[0].long_name);

  // let pointsOfInterest = await cityToPlaceCoordinates(
  //   cityDetails.result.address_components[0].long_name
  // );

  // let response = {
  //   city_name: {
  //     formatted: cityDetails.result.formatted_address,
  //     long_name: cityDetails.result.address_components[0].long_name
  //   },
  //   city_coordinates: cityDetails.result.geometry.location,
  //   points_of_interest: {
  //     top_poi: pointsOfInterest
  //   }
  // };

  let response = torontoSample;
  let cityString = req.params.city
  let formattedString = cityString.charAt(0).toUpperCase() + cityString.substr(1);
  console.log(formattedString)
  response.cityChar = cityChar[formattedString]

  res.send(response);
});

module.exports = router;
