import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Panel, Button, Glyphicon } from 'react-bootstrap';
import EditModal from './EditModal.jsx';
import DeleteButton from './DeleteButton.jsx';


class TripCityList extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    const itineraryList = this.props.itinerary.map(event => {
      return (
        <tr>
          <td><Link to={"/cities/"+event.name}>{event.name}</Link></td>
          <td>{event.start_date}</td>
          <td>{event.end_date}</td>
          <td><EditModal event={event} /></td>
          <td><DeleteButton itinerary_id={event.id} trip_id={event.trip_id}  /></td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <Panel className="cities-panel">
          <Table responsive>
            <col width="50%" />
            <col width="20%" />
            <col width="20%" />
            <col width="5%" />
            <col width="5%" />
            <thead>
              <tr>
                <th>City</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {itineraryList}
            </tbody>
          </Table>
        </Panel>
      </React.Fragment>
    );
  }
}

export default TripCityList;


// const cities = [
//   {order: 0, name: "Paris", start_date: "2018-07-07", end_date: "2018-07-17", duration: 100, lat: 48.8567, lng: 2.3510},
//   {order: 1, name: "Toronto", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 43.8163, lng: -79.4287},
//   {order: 2, name: "Los Angeles", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 34.3, lng: -118.15},
//   {order: 3, name: "Havana", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 23, lng: -82},
//   {order: 4, name: "Bogotá", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 4.598056, lng: -74.075833},
//   {order: 5, name: "Saint John", start_date: "2018-07-07", end_date: "2018-07-17",  duration: 100, lat: 45.2796, lng: -66.0628}
// ]