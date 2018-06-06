import React, { Component } from "react";
import MapContainer from "./DashboardComponents/Map/MapContainer";
import CityCharContainer from "./DashboardComponents/CityChar/CityCharContainer";
import WeatherContainer from "./DashboardComponents/Weather/WeatherContainer";

class DashboardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cityChar: {},
      city_coordinates: {},
      city_name: {},
      points_of_interest: {}
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props
    console.log("mounted");
    console.log("env", process.env)
    fetch(`http://localhost:3001/city/${params.city}`)
      .then(response => {
        return response.json();
      })
      .then(cityData => {
        console.log(cityData);
        let pinArray = cityData.points_of_interest.top_poi.map(element => {
          return element.location;
        });
        this.setState({
          cityChar: cityData.cityChar,
          city_coordinates: cityData.city_coordinates,
          city_name: cityData.city_name,
          points_of_interest: cityData.points_of_interest
        });
      });
  }

  render() {
    return (
      <div>
        <div id="map" style={{ width: 640, height: 425 }}>
          <MapContainer points_of_interest={this.state.points_of_interest}/>
        </div>
        <CityCharContainer CityChar={this.state.cityChar}/>
      </div>
    );
  }
}

export default DashboardContainer;
