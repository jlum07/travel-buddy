import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import { Table, Panel } from 'react-bootstrap';
import TripMap from './Trip/TripMap.jsx';
import TripCityList from './Trip/TripCityList.jsx';
import AddCityModal from './Trip/AddCityModal.jsx';
import './Trip.css';


class Trip extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <React.Fragment>
        <TripMap />
        <AddCityModal />
        <TripCityList />
      </React.Fragment>
    );
  }
}

export default Trip;

const cities = [
  {order: 0, name: "Paris", start_date: "2018-07-07", end_date: "2018-07-17", duration: 100, lat: 48.8567, lng: 2.3510},
  {order: 1, name: "Toronto", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 43.8163, lng: -79.4287},
  {order: 2, name: "Los Angeles", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 34.3, lng: -118.15},
  {order: 3, name: "Havana", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 23, lng: -82},
  {order: 4, name: "Bogotá", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 4.598056, lng: -74.075833},
  {order: 5, name: "Saint John", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 45.2796, lng: -66.0628}
]