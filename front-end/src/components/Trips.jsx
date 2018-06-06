import React from 'react';
import { Table, Panel } from 'react-bootstrap';
import TripsList from './TripsList.jsx';
import CreateTripModal from './CreateTripModal.jsx';
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
  {name: "Japan", start_date: "Date1", end_date: "Date2"},
  {name: "Europe", start_date: "Date3", end_date: "Date4"},
  {name: "Mexico", start_date: "Date5", end_date: "Date6"}
]