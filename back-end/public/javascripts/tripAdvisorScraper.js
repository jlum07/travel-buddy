const rp = require("request-promise");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = async function(searchInput) {
  let top_poi = [];
  let museum_poi = [];
  let food_poi = [];
  let response = await fetch(
    `https://www.tripadvisor.ca/TypeAheadJson?action=API&types=geo,nbrhd,attr,act,theme_park&filter=&legacy_format=true&urlList=true&strictParent=true&query=${searchInput}&max=6&name_depth=3&interleaved=true&scoreThreshold=0.5&strictAnd=false&typeahead1_5=true&disableMaxGroupSize=true&geoBoostFix=true&geoPages=&injectList=&neighborhood_geos=true&details=true&link_type=hotel,vr,eat,attr&rescue=true&uiOrigin=trip_search_Attractions&source=trip_search_Attractions`
  );

  let responseJSON = await response.json();

  console.log(`${responseJSON[0].urls[3].url}`);

  const topURL = responseJSON[0].urls[3].url;
  //Top POI scraping
  const options_top = {
    uri: `https://www.tripadvisor.ca${topURL}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  $ = await rp(options_top);
  $a = $(".listing_details");
  console.log($a.html())
  $a.each(function(i, elem) {
    if (
      $(this)
        .find(".listing_rating .popRanking")
        .eq(1)
        .text()
    ) {
      top_poi.push({
        title: $(this)
          .find(".listing_title")
          .text(),
        ranking: $(this)
          .find(".listing_rating .popRanking")
          .eq(1)
          .text(),
        trip_advisor_link: `www.tripadvisor.ca${$(this)
          .find(".listing_title a")
          .attr("href")}`,
        trip_advisor_picture: $(this)
          .find(".photo_image")
          .attr("src")
      });
    }
  });

  const museumURL = topURL.replace("Activities", "Activities-c49");
  //Attractions-g187497-Activities-Barcelona_Catalonia.html
  //Museum scraping
  const options_museum = {
    uri: `https://www.tripadvisor.ca/${museumURL}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  $ = await rp(options_museum);
  $a = $(".listing_info");
  $a.each(function(i, elem) {
    if (
      $(this)
        .find(".listing_rating .popRanking")
        .eq(1)
        .text()
    ) {
      museum_poi.push({
        title: $(this)
          .find(".listing_title")
          .text(),
        ranking: $(this)
          .find(".listing_rating .popRanking")
          .eq(1)
          .text(),
        trip_advisor_link: `www.tripadvisor.ca${$(this)
          .find(".listing_title a")
          .attr("href")}`,
        trip_advisor_picture: $(this)
          .find(".photo_image")
          .attr("src")
      });
    }
  });

  //Attractions-g187497-Activities-Barcelona_Catalonia.html
  const foodURL = topURL
    .replace("Attractions", "Restaurants")
    .replace("-Activities", "");
  console.log("Restaurants-g155019-Toronto_Ontario.html", foodURL);
  //Restuarant scraping
  const options_restaurant = {
    uri: `https://www.tripadvisor.ca${foodURL}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  $ = await rp(options_restaurant);
  $a = $(".listing");
  //console.log($a.html());
  $a.each(function(i, elem) {
    food_poi.push({
      title: $(this)
        .find(".title a")
        .text(),
      ranking: $(this)
        .find(".popIndex")
        .text(),
      trip_advisor_link: `www.tripadvisor.ca${$(this)
        .find(".title a")
        .attr("href")}`,
      trip_advisor_picture: $(this)
        .find(".photo_image")
        .attr("src")
    });
  });

  let poi_array = {
    top_poi: top_poi,
    museum_poi: museum_poi,
    food_poi: food_poi
  };

  return poi_array;
};
