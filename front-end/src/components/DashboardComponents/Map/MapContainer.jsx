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
      top_poi: [],
      museum_poi: [],
      food_poi: [],
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.props.toggleModal(props, marker, e);
    //this.props.setCurrentPin(props, marker, e)
  };
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
    console.log("Step 1")
    let topPinArray = this.props.points_of_interest.top_poi.map(element => {
      return element.location;
    });

    let museumPinArray = this.props.points_of_interest.museum_poi.map(
      element => {
        return element.location;
      }
    );

    let foodPinArray = this.props.points_of_interest.food_poi.map(element => {
      return element.location;
    });

    this.setState({
      top_poi: topPinArray,
      museum_poi: museumPinArray,
      food_poi: foodPinArray
    });
  }

  render() {
    console.log("Step 2")
    let bounds = new this.props.google.maps.LatLngBounds();

    this.state[this.props.currentCat.eventKey].forEach(element => {
      if (element) {
        bounds.extend(element);
      }
    });

    let markers = this.state[this.props.currentCat.eventKey].map((position, index) => {
      return (
        <Marker onClick={this.onMarkerClick} name={index} position={position} />
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
