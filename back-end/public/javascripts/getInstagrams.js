const axios = require("axios");

async function instaMedia(id) {
  try {
    let response = await axios.get(
      `https://www.instagram.com/explore/locations/${id}/?__a=1`
    );
  } catch (e) {
    console.log("sup")
    return [];
  }

  let edges = response.data.graphql.location.edge_location_to_top_posts.edges;
  let posts = edges.map(x => {
    if (x && x.node.edge_media_to_caption.edges["0"]) {
      //console.log(x)
      return {
        url: x.node.display_url,
        text: x.node.edge_media_to_caption.edges["0"].node.text,
        timestamp: x.node.taken_at_timestamp,
        demensions: x.node.dimensions
      };
    } else {
      return {};
    }
  });
  return posts;

  // axios.get(`https://www.instagram.com/explore/locations/${id}/?__a=1`)
  // .then(function (response) {
  //   console.log(response.data.graphql.location);
  //   // let edges = response.data.graphql.location.edge_location_to_media.edges;
  //   let edges = response.data.graphql.location.edge_location_to_top_posts.edges;
  //   let posts = edges.map(x => {
  //     return {
  //       url: x.node.display_url,
  //       text: x.node.edge_media_to_caption.edges["0"].node.text,
  //       timestamp: x.node.taken_at_timestamp,
  //       demensions: x.node.dimensions
  //     }
  //   })
  //   console.log(posts);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}

module.exports = function instaLocation(lat, lng) {
  return new Promise(async function(resolve, reject) {
    let instaResponse = await axios.get(
      "https://api.instagram.com/v1/locations/search?",
      {
        params: {
          access_token: "939649842.f08c135.ff5538a71c8c472ba9ea7a333d4c32eb",
          lat: lat,
          lng: lng
        }
      }
    );

    let locArr = instaResponse.data.data.slice(0, 5);
    let result = locArr.reduce(function(prev, curr) {
      return Math.abs(curr.latitude - lat) + Math.abs(curr.longitude - lng) <
        Math.abs(prev.latitude - lat) + Math.abs(prev.longitude - lng)
        ? curr
        : prev;
    });

    let test = await instaMedia(result.id);
    console.log("test");
    resolve(test);
  });

  // .then(function (response) {
  //   console.log(response.data.data);
  //   let locArr = response.data.data.slice(0,5);
  //   let result = locArr.reduce(function(prev, curr) {
  //     return ((Math.abs(curr.latitude - lat) + Math.abs(curr.longitude - lng)) < (Math.abs(prev.latitude - lat) + Math.abs(prev.longitude - lng)) ? curr : prev);
  //   });
  //   console.log(result);
  //   instaMedia(result.id);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};
