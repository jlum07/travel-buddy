const rp = require("request-promise");
const cheerio = require("cheerio");
const myArgs = process.argv.slice(2);
const fetch = require("node-fetch");

module.exports = function(searchInput) {
  return new Promise(function(resolve, reject) {
    let activitiesArr = [];
    fetch(
      `https://www.tripadvisor.ca/TypeAheadJson?action=API&types=geo,nbrhd,attr,act,theme_park&filter=&legacy_format=true&urlList=true&strictParent=true&query=${searchInput}&max=6&name_depth=3&interleaved=true&scoreThreshold=0.5&strictAnd=false&typeahead1_5=true&disableMaxGroupSize=true&geoBoostFix=true&geoPages=&injectList=&neighborhood_geos=true&details=true&link_type=hotel,vr,eat,attr&rescue=true&uiOrigin=trip_search_Attractions&source=trip_search_Attractions`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson[0].urls[3].url);
        const options = {
          uri: `https://www.tripadvisor.ca${
            myJson[0].urls[3].url
          }#ATTRACTION_SORT_WRAPPER`,
          transform: function(body) {
            return cheerio.load(body);
          }
        };

        return options;
      })
      .then(function(options) {
        rp(options)
          .then($ => {
            $a = $(".listing_info");
            $a.each(function(i, elem) {
              if (
                $(this)
                  .find(".listing_rating .popRanking")
                  .eq(1)
                  .text()
              ) {
                activitiesArr.push({
                  title: $(this)
                    .find(".listing_title")
                    .text(),
                  ranking: $(this)
                    .find(".listing_rating .popRanking")
                    .eq(1)
                    .text()
                });
                //console.log(activitiesArr);
              }
            });
            console.log("resolve")
            console.log(activitiesArr)

            resolve(activitiesArr)
          })
          .catch(err => {
            console.log(err);
          });
      });
  });
};
