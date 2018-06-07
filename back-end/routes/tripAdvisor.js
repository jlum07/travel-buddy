const express = require("express");
const router = express.Router();
const tripAdvisorScraper = require("../public/javascripts/tripAdvisorScraper");
const placeToCoordinates = require("../public/javascripts/placeToCoordinates");
const cityToPlaceCoordinates = require("../public/javascripts/cityToPlaceCoordinates");
const getInstagrams = require("../public/javascripts/getInstagrams");
const cityAutoComplete = require("../public/javascripts/cityAutoComplete");

router.get("/", (req, res) => {
  tripAdvisorScraper(req.query.city).then(function(result) {
    res.send(JSON.stringify(result));
  });
});
//Barcelona = 41.402862, 2.174366
//Toronto = lat: 43.6532, lng: -79.3832
router.get("/urls", (req, res) => {
  console.log(req.query)
  placeToCoordinates(req.query, {
    lat: 41.402862,
    lng: 2.174366
  }).then(function(result) {
    res.send(result);
  });
});

router.get("/insta", async (req, res) => {
  let result = await getInstagrams(43.6532, -79.3832);
  res.send(result);
});

router.get("/test", (req, res) => {
  cityToPlaceCoordinates(req.query.city).then(function(result) {
    res.send(result);
  });
});

router.get("/auto", (req, res) => {
  cityAutoComplete(req.query.city).then(function(result) {
    res.send(result);
  });
});

module.exports = router;
