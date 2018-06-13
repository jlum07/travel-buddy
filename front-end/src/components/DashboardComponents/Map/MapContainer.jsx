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
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || API_KEY.API_KEY,
      nightlife_poi: [],
      showingInfoWindow: false,
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.props.toggleModal(props, marker, e);
    this.props.setActiveMarker(props);
    console.log(props);
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
        showingInfoWindow: false
      });
    }
  };

  componentDidMount() {
    // console.log("Step 1")
    console.log("Step 1");
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

    let nightlifePinArray = this.props.points_of_interest.nightlife_poi.map(
      element => {
        return element.location;
      }
    );

    this.setState({
      top_poi: topPinArray,
      museum_poi: museumPinArray,
      food_poi: foodPinArray,
      nightlife_poi: nightlifePinArray
    });
  }

  render() {
    // console.log("Step 2")
    console.log("Step 2");
    let bounds = new this.props.google.maps.LatLngBounds();

    this.state[this.props.currentCat.eventKey].forEach(element => {
      if (element) {
        bounds.extend(element);
      }
    });

    if (this.props.activeMarker) {
      bounds = new this.props.google.maps.LatLngBounds();
      bounds.extend(this.props.activeMarker.position);
    }

    let markers = this.state[this.props.currentCat.eventKey].map(
      (position, index) => {
        return (
          <Marker
            onClick={this.onMarkerClick}
            key={index}
            name={index}
            position={position}
          />
        );
      }
    );

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={this.props.city_coordinates}
        bounds={bounds}
        onClick={this.onMapClicked}
        maxZoom={17}
      >
        {markers}
        <div>
          <h1>{this.state.selectedPlace.name || ""}</h1>
        </div>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY || API_KEY.API_KEY
})(MapContainer);
