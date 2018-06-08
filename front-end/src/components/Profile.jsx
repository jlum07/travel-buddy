import React from 'react';
import { Image, Col, Row, Grid } from 'react-bootstrap';
import axios from 'axios';
import './Profile.css';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        id: null,
        username: 'test',
        firstName: 'hoho',
        lastName: null,
        email: null,
        rank_food: null,
        rank_arts: null,
        rank_nightlife: null,
        rank_history: null,
        rank_price: null,
        profilePic: null
      }
    }
  }

  componentDidMount(){
    let session_token = localStorage.getItem('session_token');
    console.log('session_token = ', session_token);

    axios.get('http://localhost:3001/users/profiledata', {
      headers: {
        session_token: session_token
      }
    })
    .then((response)=>{
      console.log('response.data = ', response.data);
      console.log('this.state = ', this.state);
      this.setState({
        currentUser: {
          id: response.data.id,
          username: response.data.username,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          rank_food: response.data.food_rank,
          rank_arts: response.data.arts_rank,
          rank_nightlife: response.data.nightlife_rank,
          rank_history: response.data.history_rank,
          rank_price: response.data.price_rank,
          profilePic: response.data.profile_pic
        }
      })


    })
    .catch((error)=>{
      console.log(error);
    });


  }



  render(){
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <h1>{this.state.currentUser.username}</h1>
            <h3>Profile</h3>
            <ul>
              <li>First Name: {this.state.currentUser.firstName}</li>
              <li>Last Name:  {this.state.currentUser.lastName}</li>
              <li>Email:      {this.state.currentUser.email}</li>
            </ul>
            <h3>My Preferences</h3>
            <ul>
              <li>Food:      {this.state.currentUser.rank_food}</li>
              <li>Nightlife: {this.state.currentUser.rank_nightlife}</li>
              <li>Price:     {this.state.currentUser.rank_price}</li>
              <li>History:   {this.state.currentUser.rank_history}</li>
              <li>Arts:      {this.state.currentUser.rank_arts}</li>
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
