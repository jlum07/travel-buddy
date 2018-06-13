const rp = require("request-promise");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = async function(searchInput) {
  let top_poi = [];
  let museum_poi = [];
  let food_poi = [];
  let nightlife_poi = [];
  let response = await fetch(
    `https://www.tripadvisor.ca/TypeAheadJson?action=API&types=geo,nbrhd,attr,act,theme_park&filter=&legacy_format=true&urlList=true&strictParent=true&query=${searchInput}&max=6&name_depth=3&interleaved=true&scoreThreshold=0.5&strictAnd=false&typeahead1_5=true&disableMaxGroupSize=true&geoBoostFix=true&geoPages=&injectList=&neighborhood_geos=true&details=true&link_type=hotel,vr,eat,attr&rescue=true&uiOrigin=trip_search_Attractions&source=trip_search_Attractions`
  );

  let responseJSON = await response.json();

  // console.log(`${responseJSON[0].urls[3].url}`);

  const topURL = responseJSON[0].urls[3].url;
  //Top POI scraping
  const options_top = {
    uri: `https://www.tripadvisor.ca${topURL}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  let regex = new RegExp("var lazyImgs = ((.|\n)*)var lazyHtml");
  // console.log(regex);
  $ = await rp(options_top);

  let lazyLoadArray = $.html().match(regex);
  //console.log(lazyLoadArray[1])
  let lazyImgs = eval(lazyLoadArray[1]);


  $a = $(".listing_details");
  $a.each(function(i, elem) {
    if (
      $(this)
        .find(".listing_rating .popRanking")
        .eq(1)
        .text()
    ) {

      let picture = lazyImgs.find(element => {
        return (
          element.id ===
          $(this)
            .find(".photo_image")
            .attr("id")
        );
      });

      let pictureData = picture.data;

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
        trip_advisor_picture: pictureData
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

  lazyLoadArray = $.html().match(regex);
  // console.log(lazyLoadArray[1])
  lazyImgs = eval(lazyLoadArray[1]);
  // console.log("eval lazyload2")

  $a = $(".listing_details");
  $a.each(function(i, elem) {
    let pictureData = ''
    let picture = lazyImgs.find(element => {
        return (
          element.id ===
          $(this)
            .find(".photo_image")
            .attr("id")
        );
      });
       // console.log($(this)
       //      .find(".photo_image")
       //      .attr("id"))
       if(picture){
        pictureData = picture.data;
       }


    if (
      $(this)
            .find(".photo_image")
            .attr("id")
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
        trip_advisor_picture: pictureData
      });
    }
  });

  //Attractions-g187497-Activities-Barcelona_Catalonia.html
  const foodURL = topURL
    .replace("Attractions", "Restaurants")
    .replace("-Activities", "");
  // console.log("Restaurants-g155019-Toronto_Ontario.html", foodURL);
  //Restuarant scraping
  const options_restaurant = {
    uri: `https://www.tripadvisor.ca${foodURL}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  $ = await rp(options_restaurant);

  lazyLoadArray = $.html().match(regex);
  //console.log(lazyLoadArray[1])
  lazyImgs = eval(lazyLoadArray[1]);


  $a = $(".listing");
  //console.log($a.html());
  $a.each(function(i, elem) {
    let pictureData = ''
    let picture = lazyImgs.find(element => {
        return (
          element.id ===
          $(this)
        .find(".photo_image")
        .attr("id")
        );
      });
    //if(picture){
      // console.log($(this)
      //   .find(".photo_image")
      //   .attr("id"))
       pictureData = picture.data;
    //}

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
      trip_advisor_picture: pictureData
    });
  });

  const nightlifeURL = topURL.replace("Activities", "Activities-c20");
  //Attractions-g187497-Activities-Barcelona_Catalonia.html
  //nightlife scraping
  const options_nightlife = {
    uri: `https://www.tripadvisor.ca/${nightlifeURL}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  $ = await rp(options_nightlife);

  lazyLoadArray = $.html().match(regex);
  // console.log(lazyLoadArray[1])
  lazyImgs = eval(lazyLoadArray[1]);
  // console.log("eval lazyload2")

  $a = $(".listing_details");
  $a.each(function(i, elem) {
    let pictureData = ''
    let picture = lazyImgs.find(element => {
        return (
          element.id ===
          $(this)
            .find(".photo_image")
            .attr("id")
        );
      });
       // console.log($(this)
       //      .find(".photo_image")
       //      .attr("id"))
       if(picture){
        pictureData = picture.data;
       }


    if (
      $(this)
            .find(".photo_image")
            .attr("id")
    ) {
      nightlife_poi.push({
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
        trip_advisor_picture: pictureData
      });
    }
  });



  let poi_array = {
    top_poi: top_poi,
    museum_poi: museum_poi,
    food_poi: food_poi,
    nightlife_poi: nightlife_poi
  };

  return poi_array;
};
