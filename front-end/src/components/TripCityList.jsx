import React from 'react';
import { Table, Panel } from 'react-bootstrap';
// import './TripCityList.css';


class TripCityList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render(){

    const tripList = trips.map(trip => {
      return (
        <tr>
          <td>{trip.name}</td>
          <td>{trip.start_date}</td>
          <td>{trip.end_date}</td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <Panel className="trips-panel">
          <Table responsive>
            <col width="50%" />
            <col width="25%" />
            <col width="25%" />
            <thead>
              <tr>
                <th>Trip Name</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {tripList}
            </tbody>
          </Table>
        </Panel>
      </React.Fragment>
    );
  }
}

export default TripCityList;


const cities = [
  {order: 0, name: "Paris", duration: 100, lat: 48.8567, lng: 2.3510},
  {order: 1, name: "Toronto", duration: 100, lat: 43.8163, lng: -79.4287},
  {order: 2, name: "Los Angeles", duration: 100, lat: 34.3, lng: -118.15},
  {order: 3, name: "Havana", duration: 100, lat: 23, lng: -82},
  {order: 4, name: "Bogotá", duration: 100, lat: 4.598056, lng: -74.075833},
  {order: 5, name: "Saint John", duration: 100, lat: 45.2796, lng: -66.0628}
]