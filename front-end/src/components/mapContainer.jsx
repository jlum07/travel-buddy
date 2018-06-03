import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";

export class MapContainer extends React.Component {
  onMarkerClick() {
    console.log("suppppp");
  }

  render() {
    const pos = [
      {
        lat: 43.6532,
        lng: -79.3932
      },
      {
        lat: 43.6532,
        lng: -79.3892
      }
    ];

    let markers = pos.map(position => {
      return <Marker onClick={this.onMarkerClick} position={position}/>
    })

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 43.6532,
          lng: -79.3832
        }}
      >
        {markers}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapContainer);
