import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import fetch from "node-fetch";
require('dotenv').config();

export class MapContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pins: [],
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
    };
  }


  onMarkerClick() {
    console.log("suppppp");
  }

  componentDidMount() {
    fetch(`http://localhost:3001/trip-advisor/test?city=toronto`, {
      mode: "no-cors"
    })
      .then(response => {
        return response.json();
      })
      .then(pinData => {
        let pinArray = pinData.map(element => {
          return element.location;
        });
        this.setState({ pins: pinArray });
      });
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

    let markers = this.state.pins.map(position => {
      return <Marker onClick={this.onMarkerClick} position={position} />;
    });

    // console.log(markers);

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

console.log(process.env);

export default GoogleApiWrapper({
  apiKey:  process.env.GOOGLE_MAPS_API_KEY
})(MapContainer);
