import React from 'react';
import { Table, Panel } from 'react-bootstrap';
import TripsList from './Trips/TripsList.jsx';
import CreateTripModal from './Trips/CreateTripModal.jsx';
import './Trips.css';


class Trips extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render(){
    return (
      <React.Fragment>
        <TripsList trips={trips} />
        <br />
        <CreateTripModal />
      </React.Fragment>
    );
  }
}

export default Trips;


const trips = [
  { id: 1, trip_name: "Japan", start_date: "2018-07-07", end_date: "2018-07-07" },
  { id: 2, trip_name: "Europe", start_date: "2018-07-07", end_date: "2018-07-07" },
  { id: 3, trip_name: "Mexico", start_date: "2018-07-07", end_date: "2018-07-07" }
]