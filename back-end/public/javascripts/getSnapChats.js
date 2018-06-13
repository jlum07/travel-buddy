const snapMap = require('./snapAPI');

module.exports = function getSnaps(lat, lng){
  return new Promise((resolve, reject) => {
    snapMap.getPlaylist(lat, lng, 1000, 12).then(function(playlist) {
      var snaps = [];
      // console.log(playlist);

      if (Object.keys(playlist).length === 0) {
        resolve(["No Snaps!"])
        //reject('No Snaps Found!');
      }

      else if (playlist.elements !== undefined && playlist.elements.length > 0){
        let numberOfSnaps = (playlist.elements.length < 8)? playlist.elements.length : 8;

        for (let i = 0; i < numberOfSnaps; i++){
          snaps.push(`${playlist.elements[i].snapInfo.streamingMediaInfo.prefixUrl}media.mp4`)
        }

        resolve(snaps);
      }
      else{
        resolve(["No Snaps!"])
        //reject('Response:410, try again')
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

