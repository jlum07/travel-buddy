const express = require("express");
const router = express.Router();
const cityToPlaceCoordinates = require("../public/javascripts/cityToPlaceCoordinates");
const cityAutoComplete = require("../public/javascripts/cityAutoComplete");
const torontoSample = require("./sampleData/torontoSample.js");
const cityChar = require("./sampleData/cityChar2.js");
const API_KEY = require("../apikey.js");
const fetch = require("node-fetch");
const API = false;


router.get('/autocorrect/:name', (req, res)=>{
  let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.name}&types=(cities)&key=${API_KEY}`
  fetch(url)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    if (json.predictions.length === 0){
      console.log('No cities found');
      res.status(204).send(); // 204 = NO CONTENT
    }
    else {
      let correctedCityName = json.predictions[0].description.split(',')[0];
      res.status(200);
      res.send(correctedCityName);
    }
    res.send(json.pre);    
  })
  .catch((error)=>{
    console.error(error);
    res.status(500);
    res.send('Google Maps Autocorrect request failed');
  })
})



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
