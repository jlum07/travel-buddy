const express = require("express");
const router = express.Router();
const tripAdvisorScraper = require("../public/javascripts/tripAdvisorScraper");
const placeToCoordinates = require("../public/javascripts/placeToCoordinates");
const cityToPlaceCoordinates = require("../public/javascripts/cityToPlaceCoordinates");

router.get("/", (req, res) => {
  tripAdvisorScraper(req.query.city).then(function(result) {
    res.send(JSON.stringify(result));
  });
});

router.get("/urls", (req, res) => {
  placeToCoordinates(req.query.place).then(function(result) {
    res.send(result);
  });
});

router.get("/test", (req, res) => {
  cityToPlaceCoordinates(req.query.city).then(function(result) {
    res.send(result);
  });
});

module.exports = router;
