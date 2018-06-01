const snapMap = require('./lib');

module.exports = function getSnaps(lat, lng){
  return new Promise((resolve, reject) => {
    snapMap.getPlaylist(lat, lng, 2000, 12).then(function(playlist) {
      var snaps = [];
      // console.log(playlist);

      if (Object.keys(playlist).length === 0) {
        reject('No Snaps Found!');
      }

      else if (playlist.elements !== undefined && playlist.elements.length > 0){
        playlist.elements.forEach((element)=>{
          snaps.push(`${element.snapInfo.streamingMediaInfo.prefixUrl}media.mp4`);
        })
        resolve(snaps);
      }
      else{
        reject('Response:410, try again')
      }
    });
  })
}




// Middle of the Ocean: (29.880547, -44.833703)
// Toronto Waterfront: (43.638570, -79.385858)
// CN tower: (43.642713, -79.386519)       
// Kampot: (10.600762, 104.182933)
// Koh Phi Phi: (7.735865, 98.777600)
// LHL: (43.644627, -79.395115)
// Barcelona: (41.377897, 2.173313)



// OTHER TYPES OR REQUESTS:

//   // get snaps around Union Square, San Francisco, CA
// snapMap.getPlaylist(37.787975, -122.407515, 3000, 12).then(function(playlist) {
//   console.log(playlist);
// });


// // get snaps for the Bay Bridge story
// snapMap.getPoiPlaylist("5016cb954d2f288c").then(function(playlist) {
//   console.log(playlist);
// });

// // get search results for "San Francisco"
// snapMap.getSearchCards("San Francisco", 37.787975, -122.407515, 12).then(function(searchCards) {
//   console.log(searchCards);
// });

// // get your IP address
// snapMap.getGeoIp().then(function(geoIp) {
//   console.log(geoIp);
// });

