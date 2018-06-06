import React from 'react';
import { Table, Panel } from 'react-bootstrap';
// import './TripsList.css';


class TripsList extends React.Component {

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

export default TripsList;


const trips = [
  {name: "Japan", start_date: "Date1", end_date: "Date2"},
  {name: "Europe", start_date: "Date3", end_date: "Date4"},
  {name: "Mexico", start_date: "Date5", end_date: "Date6"}
]