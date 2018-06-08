import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import fetch from "node-fetch";
import API_KEY from "./apikey.js";

import "./MapContainer.css";

require("dotenv").config();

export class MapContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pins: [],
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = () => {
    this.props.toggleModal()
  }
    // this.setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true
    // });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    let pinArray = this.props.points_of_interest.top_poi.map(element => {
      return element.location;
    });
    this.setState({ pins: pinArray });
  }

  render() {
    let bounds = new this.props.google.maps.LatLngBounds();

    this.state.pins.forEach(element => {
      if (element) {
        bounds.extend(element);
      }
    });

    let markers = this.state.pins.map(position => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          name={"Current location"}
          position={position}
        />
      );
    });

    // console.log(markers);

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={this.props.city_coordinates}
        bounds={bounds}
        onClick={this.onMapClicked}
      >
        {markers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name || ""}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY.API_KEY
})(MapContainer);
