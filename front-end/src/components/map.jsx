import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";

export class MapContainer extends React.Component {

  onMarkerClick(){
    console.log("suppppp")
  }

  render() {
    const pos = { lat: 37.759703, lng: -122.428093 };
    const pos2 = { lat: 37.759703, lng: -122.42 };
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick}/>
        <Marker position={pos} />
        <Marker position={pos2} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapContainer);
