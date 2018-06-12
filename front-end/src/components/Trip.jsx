import React from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import AmCharts from "@amcharts/amcharts3-react";
import { Table, Panel } from 'react-bootstrap';
import TripMap from './Trip/TripMap.jsx';
import TripCityList from './Trip/TripCityList.jsx';
import TripTimeline from './Trip/TripTimeline.jsx';
import TripEventTimeline from './Trip/TripEventTimeline.jsx';
import AddModal from './Trip/AddModal.jsx';
import './Trip.css';

// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';

const timezone = moment.tz.guess();

class Trip extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { cities: cities };
    this.state = { itinerary: [] };

    // console.log("this is match " ,this.props.match.params.id);
    // console.log("this is location " ,this.props.location);

    // console.log(timezone);
  }

  componentWillReceiveProps(newProps) {
    axios.get(`http://localhost:3001/trips/${newProps.match.params.id}`, {
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
      // console.log(tempData);
      this.setState({itinerary: tempData});
    })
    .catch( error => {
      console.log("error: ", error);
    });
  }


  render(){
    if (this.props.currentUser.id === null){
      return <h1>Please log in to view trip</h1>
    }
    else {      
      return (
        <React.Fragment>
          <TripMap itinerary={this.state.itinerary} />
          <AddModal userId={this.props.currentUser.id} tripId={this.props.match.params.id} />
          <TripCityList itinerary={this.state.itinerary} />
          <TripEventTimeline itinerary={this.state.itinerary} />
          <TripTimeline itinerary={this.state.itinerary} />
        </React.Fragment>
      );
    }
  }
}

export default Trip;

