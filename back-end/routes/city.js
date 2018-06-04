const express = require("express");
const router = express.Router();
const cityToPlaceCoordinates = require("../public/javascripts/cityToPlaceCoordinates");
const cityAutoComplete = require("../public/javascripts/cityAutoComplete");
//

router.get("/:city", async (req, res) => {
  let cityDetails = await cityAutoComplete(req.params.city);

  console.log(cityDetails.result.address_components[0].long_name);

  let pointsOfInterest = await cityToPlaceCoordinates(
    cityDetails.result.address_components[0].long_name
  );

  let response = {
    city_name: {
      formatted: cityDetails.result.formatted_address,
      long_name: cityDetails.result.address_components[0].long_name
    },
    city_coordinates: cityDetails.result.geometry.location,
    points_of_interest: {
      top_poi: pointsOfInterest
    }
  };

  res.send(response);
});

module.exports = router;
