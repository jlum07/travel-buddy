import React from 'react';
import { Image, Col, Row, Grid } from 'react-bootstrap'
import './Profile.css';

export default class Home extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <h1>{this.props.currentUser.username}</h1>
            <h3>Profile</h3>
            <ul>
              <li>First Name: {this.props.currentUser.firstName}</li>
              <li>Last Name:  {this.props.currentUser.lastName}</li>
              <li>Email:      {this.props.currentUser.email}</li>
            </ul>
            <h3>My Preferences</h3>
            <ul>
              <li>Food:      {this.props.currentUser.rank_food}</li>
              <li>Nightlife: {this.props.currentUser.rank_nightlife}</li>
              <li>Price:     {this.props.currentUser.rank_price}</li>
              <li>History:   {this.props.currentUser.rank_history}</li>
              <li>Arts:      {this.props.currentUser.rank_arts}</li>
            </ul>
          </Col>
          <Col md={4}>
            <Image id='profile_pic' src={this.props.currentUser.profilePic} rounded/>
          </Col>
        </Row>
      </Grid>
      )
  }
}
