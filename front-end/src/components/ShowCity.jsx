import React from 'react';
import { Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap'
//import MapContainer from './mapContainer.jsx';
import axios from 'axios';
import Map from './DashboardComponents/Map/MapContainer.jsx';
import CityModal from './DashboardComponents/CityModal/CityModal.jsx';

import './ShowCity.css';

export default class ShowCity extends React.Component {
  constructor() {
    super();
    this.state = {
      points_of_interest: {},
      showModal: false,
      currentPin: {} // 
    };
  }

  toggleModal = (props, marker, e) => {
    if (this.state.showModal) {
      this.setState({
        showModal: false,
        //currentPin: this.state.points_of_interest[props.name]
      });
    } else {
      // console.log("props.name", this.state.points_of_interest.top_poi[props.name])
      this.setState({
        showModal: true,
        currentPin: this.state.points_of_interest.top_poi[props.name]
      });
    }
  };









  render(){
    return (
      <Grid>
        <h1>{this.props.match.params.city}</h1>
        <Row>
          <Col xs={12} md={8}>
          </Col>
          <Col xs={12} md={4}>
            <Jumbotron id='poi_list'>

              <ul>
                <li>CN tower</li>
                <li>Ripleys</li>
                <li>Skydome</li>
                <li>BMO Feild</li>
              </ul>
            <CityModal
              toggleModal={this.toggleModal}
              showModal={this.state.showModal}
              currentPin={this.state.currentPin}
            />
            <Button onClick={this.toggleModal} >Show Modal</Button>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
      )
  }
}


