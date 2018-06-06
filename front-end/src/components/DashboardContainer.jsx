import React, { Component } from "react";
import MapContainer from "./DashboardComponents/Map/MapContainer"
import CityCharContainer from "./DashboardComponents/CityChar/CityCharContainer"
import WeatherContainer from "./DashboardComponents/Weather/WeatherContainer"


class DashboardContainer extends React.Component {

  render(){
    return <MapContainer width={640} height={425}/>
  }
}

export default DashboardContainer;