import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";


const targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
const planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";

// look into lodash/merge

class TripMap extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    if (this.props.itinerary.length === 0) {
      return null;
    }



    // var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
    // var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";

    const latLine = this.props.itinerary.map(city => city.lat);
    const lngLine = this.props.itinerary.map(city => city.lng);

    const cityImages = this.props.itinerary.map(city => {
      return {
        svgPath: targetSVG,
        title: city.name,
        latitude: city.lat,
        longitude: city.lng
        // add url
      }
    })

    const config = {
      "type": "map",
      "theme": "none",
      "projection": "miller",
      "dataProvider": {
        "map": "worldLow",
        // "zoomLevel": 2,
        // "zoomLongitude": -55,
        // "zoomLatitude": 42,

        "lines": [ {
          "id": "line1",
          "arc": -0.85,
          "alpha": 0.3,
          "latitudes": latLine,
          "longitudes": lngLine
        }, {
          "id": "line2",
          "alpha": 0,
          "color": "#000000",
          "latitudes": latLine,
          "longitudes": lngLine
        } ],
        "images": [
        ...cityImages
        , {
          "svgPath": planeSVG,
          "positionOnLine": 0,
          "color": "#000000",
          "alpha": 0.1,
          "animateAlongLine": true,
          "lineId": "line2",
          "flipDirection": false,
          "loop": true,
          "scale": 0.03,
          "positionScale": 1.3
        }, {
          "svgPath": planeSVG,
          "positionOnLine": 0,
          "color": "#585869",
          "animateAlongLine": true,
          "lineId": "line1",
          "flipDirection": false,
          "loop": true,
          "scale": 0.03,
          "positionScale": 1.8
        } ]
      },

      "areasSettings": {
        "unlistedAreasColor": "#8dd9ef"
      },

      "imagesSettings": {
        "color": "#585869",
        "rollOverColor": "#585869",
        "selectedColor": "#585869",
        "pauseDuration": 0.2,
        "animationDuration": 2.5,
        "adjustAnimationSpeed": true
      },

      "linesSettings": {
        "color": "#585869",
        "alpha": 0.4
      },

      "export": {
        "enabled": true
      }

    }


    return (
      <React.Fragment>
        <AmCharts.React className="trip-map" options={config} />
      </React.Fragment>
    );
  }
}

export default TripMap;

// const cities = [
//   {order: 0, name: "Paris", duration: 100, lat: 48.8567, lng: 2.3510},
//   {order: 1, name: "Toronto", duration: 100, lat: 43.8163, lng: -79.4287},
//   {order: 2, name: "Los Angeles", duration: 100, lat: 34.3, lng: -118.15},
//   {order: 3, name: "Havana", duration: 100, lat: 23, lng: -82},
//   {order: 4, name: "Bogotá", duration: 100, lat: 4.598056, lng: -74.075833},
//   {order: 5, name: "Saint John", duration: 100, lat: 45.2796, lng: -66.0628}
// ]