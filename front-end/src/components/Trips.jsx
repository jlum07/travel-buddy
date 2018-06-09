import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, Panel } from 'react-bootstrap';
import TripsList from './Trips/TripsList.jsx';
import CreateTripModal from './Trips/CreateTripModal.jsx';
import './Trips.css';


class Trips extends React.Component {

  constructor(props) {
    super(props);
    this.state = { trips: [] };

    // console.log(moment(Date()).format("YYYY-MM-DD"));

  }

  componentWillMount() {

    axios.get('http://localhost:3001/trips', {
      params: {
        user_id: 1
      }
    })
    .then( response => {

      let tempData = response.data.map(row => {
        return {
          ...row,
          start_date: moment(row.start_date).format("YYYY-MM-DD"),
          end_date: moment(row.end_date).format("YYYY-MM-DD")
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
    return (
      <React.Fragment>
        <TripsList trips={this.state.trips} />
        <br />
        <CreateTripModal addTrip={this.addTrip} />
      </React.Fragment>
    );
  }
}

export default Trips;
