//Used for nightlife:
// --'https://www.ranker.com/list/top-party-cities-of-the-world/places-to-go'
// --'.listItem__title'
// Used for food:
// --'https://www.loveexploring.com/gallerylist/69944/ranked-the-50-best-food-cities-of-2017'
// --'.gallery__caption-title'
// Used for culture:
// --'http://www.thisisinsider.com/worlds-most-cultural-cities-2017-3'
// --'.slide-title-text'
// Used for cost:
// --'https://www.numbeo.com/cost-of-living/rankings_current.jsp'
// --'.cityOrCountryInIndicesTable a'

const rp = require("request-promise");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

let activitiesArr = [];

const options = {
  uri: "https://www.numbeo.com/cost-of-living/rankings_current.jsp",
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options).then($ => {
  //console.log($.html())
  $a = $("tr");
  $a.each(function(i, elem) {
    activitiesArr.push({
      name: $(this)
        .find(".cityOrCountryInIndicesTable a")
        .text(),
      index: $(this)
        .find("td")
        .eq(2)
        .text()
    });
  });
  console.log(JSON.stringify(activitiesArr));
});


