const express = require("express");
const router = express.Router();
const tripAdvisorScraper = require("../public/javascripts/tripAdvisorScraper");

router.get("/", (req, res) => {
  console.log(req.query);
  console.log(req.query.city)
  tripAdvisorScraper(req.query.city)
    .then(function(result) {
      console.log(result)
      res.send(JSON.stringify(result));
  });
});

module.exports = router;
