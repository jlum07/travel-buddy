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
        <TripsList />
        <br />
        <CreateTripModal />
      </React.Fragment>
    );
  }
}

export default Trips;


const trips = [
  {name: "Japan", start_date: "2018-07-07", end_date: "2018-07-07"},
  {name: "Europe", start_date: "2018-07-07", end_date: "2018-07-07"},
  {name: "Mexico", start_date: "2018-07-07", end_date: "2018-07-07"}
]