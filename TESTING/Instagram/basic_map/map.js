var map;

function initMap() {

  // Initial map options
  var options = {
    // zoom:2.25,
    zoom:14,
    // toronto
    center:{lat:43.6532,lng:-79.3832}
    // center of earth map
    // center:{lat:31.22685967,lng:11.24664299}
  }

  // Create Map
  map = new google.maps.Map(document.getElementById('map'), options);

  // Event listener click on map
  google.maps.event.addListener(map, 'click', function(event){
    // Add marker
    // addMarker({coords:event.latLng});
    console.log(event.latLng.lat(),event.latLng.lng());

    instaLocation(event.latLng.lat(),event.latLng.lng());

  });

  var markers = [];


  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
      //icon:props.iconImage
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
}


