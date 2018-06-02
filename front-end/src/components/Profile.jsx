import React from 'react';
import { Jumbotron, Button, Image, Col, Row, Grid } from 'react-bootstrap'
import './Profile.css';

export default class Home extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <h1>Donald Trump</h1>

            <h3>My Trips</h3>
            <ul>
              <li>Europe</li>
              <li>France</li>
              <li>Texas</li>
              <li>Michigan</li>
            </ul>
          </Col>
          <Col md={4}>
            <Image src='assets/trump.jpg' rounded/>
          </Col>
        </Row>
      </Grid>
      )
  }
}
