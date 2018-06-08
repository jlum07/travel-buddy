import React from 'react';
import { Table, Panel, Button, Glyphicon } from 'react-bootstrap';


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
          <td><Button><Glyphicon glyph="pencil" /></Button></td>
          <td><Button><Glyphicon glyph="trash" /></Button></td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <Panel className="trips-panel">
          <Table responsive>
            <col width="50%" />
            <col width="20%" />
            <col width="20%" />
            <col width="5%" />
            <col width="5%" />
            <thead>
              <tr>
                <th>Trip Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Edit</th>
                <th>Delete</th>
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
  {name: "Japan", start_date: "2018-07-07", end_date: "2018-07-07"},
  {name: "Europe", start_date: "2018-07-07", end_date: "2018-07-07"},
  {name: "Mexico", start_date: "2018-07-07", end_date: "2018-07-07"}
]