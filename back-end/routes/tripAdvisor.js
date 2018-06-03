const express = require("express");
const router = express.Router();
const tripAdvisorScraper = require("../public/javascripts/tripAdvisorScraper");

router.get("/", (req, res) => {
  tripAdvisorScraper(req.query.city).then(function(result) {
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
