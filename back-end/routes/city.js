const express = require("express");
const router = express.Router();
const cityToPlaceCoordinates = require("../public/javascripts/cityToPlaceCoordinates");
const cityAutoComplete = require("../public/javascripts/cityAutoComplete");
const torontoSample = require("./sampleData/torontoSample.js");
const cityChar = require("./sampleData/cityChar.js");

const API = false;

router.get("/:city", async (req, res) => {
  //If it should call the API's, just so it is possible to turn it off to avoid excess calls
  let response = torontoSample;

  if (API) {
    let cityDetails = await cityAutoComplete(req.params.city);

    let pointsOfInterest = await cityToPlaceCoordinates(cityDetails.result);

    response = {
      city_name: {
        formatted: cityDetails.result.formatted_address,
        long_name: cityDetails.result.address_components[0].long_name
      },
      city_coordinates: cityDetails.result.geometry.location,
      points_of_interest: {
        top_poi: pointsOfInterest
      }
    };
  }

  let cityString = req.params.city;
  let formattedString =
    cityString.charAt(0).toUpperCase() + cityString.substr(1);

  response.cityChar = cityChar[formattedString];

  res.send(response);
});

module.exports = router;
