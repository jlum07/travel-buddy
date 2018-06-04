const getSnaps = require('./index.js');

getSnaps(43.644029, -79.394689).then((snaps)=>{console.log(snaps)}).catch((error)=>{console.log(error)})

// Middle of the Ocean: (29.880547, -44.833703) - Will return NO snaps
// Toronto Waterfront: (43.638570, -79.385858)
// CN tower: (43.642713, -79.386519)       
// Kampot: (10.600762, 104.182933)
// Koh Phi Phi: (7.735865, 98.777600)
// LHL: (43.644627, -79.395115)
// Barcelona: (41.377897, 2.173313)
