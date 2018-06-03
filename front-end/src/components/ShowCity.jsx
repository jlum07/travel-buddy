import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap'
import Map from './Map.jsx'
import './ShowCity.css';

export default class ShowCity extends React.Component {
  render(){
    return (
      <Grid>
        <h1>{this.props.match.params.city}</h1>
        <Row>
          <Col xs={12} md={8}>
            <Map />
          </Col>
          <Col xs={12} md={4}>
            <Jumbotron id='poi_list'>
              <ul>
                <li>CN tower</li>
                <li>Ripleys</li>
                <li>Skydome</li>
                <li>BMO Feild</li>
              </ul>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
      )
  }
}


