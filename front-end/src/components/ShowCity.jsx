import React from 'react';
import { Jumbotron, Grid, Row, Col, Image } from 'react-bootstrap'
import './ShowCity.css';

export default class ShowCity extends React.Component {
  render(){
    return (
      <Grid>
        <h1>Toronto</h1>
        <Row>
          <Col xs={12} md={8}>
            <Image id='map' src="assets/Toronto-Map.jpg" rounded />
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
