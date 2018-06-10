import React from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { Table, Panel } from 'react-bootstrap';
import TripsList from './Trips/TripsList.jsx';
import CreateTripModal from './Trips/CreateTripModal.jsx';
import './Trips.css';

const timezone = moment.tz.guess();

class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      trips: [],
      userId: null // if userId is null, render a page which says "please login"
       };
    // console.log(moment(Date()).format("YYYY-MM-DD"));
  }

  componentWillReceiveProps(newProps){
    this.setState({ userId: newProps.currentUser.id });
    axios.get('http://localhost:3001/trips', {
      params: {
        user_id: newProps.currentUser.id
      }
    })
    .then( response => {
      let tempData = response.data.map(row => {
        return {
          ...row,
          start_date: moment(row.start_date).tz(timezone).format("YYYY-MM-DD"),
          end_date: moment(row.end_date).tz(timezone).format("YYYY-MM-DD")
        }
      })
      this.setState({trips: tempData});
    })
    .catch( error => {
      console.log(error);
    });
  }

  addTrip = (trip) => {
    let newTrips = this.sate.trips;
    newTrips.push(trip);
    this.setState({ trips: newTrips });
  }

  editTrip = (trip) => {

  }

  render(){

    if (this.state.userId){
      return (
        <React.Fragment>
          <TripsList trips={this.state.trips} />
          <br />
          <CreateTripModal addTrip={this.addTrip} />
        </React.Fragment>
      );      
    }
    else {
      return (<h1>Please Log In to view trips</h1>)
    }
  }
}

export default Trips;
