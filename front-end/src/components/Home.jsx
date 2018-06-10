import React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, Col, Row, Grid } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import API_KEY from './apikey.js';
import './Home.css';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchCity: null,
      redirectToCity: false
    };
    this.handleSearchCityChange = this.handleSearchCityChange.bind(this);
    this.searchCity = this.searchCity.bind(this);
    this.takeMeAnyWhere = this.takeMeAnyWhere.bind(this);
    this.enterListener = this.enterListener.bind(this);
  }

  takeMeAnyWhere(){
    let randomIndex = Math.floor(Math.random()*7+1);
    console.log(randomIndex);
    let randonCityList = ['Toronto', 'Barcelona', 'Bangkok', 'Munich', 'Houston', 'Rome', 'Cairo']
    this.setState({
      searchCity: randonCityList[randomIndex],
      redirectToCity: true
    });
  }

  searchCity(){
    console.log(API_KEY);



    this.setState({ redirectToCity: true });
  }

  handleSearchCityChange(event){
    this.setState({
      searchCity: event.target.value
    });
  }

  enterListener(event){
    if (event.key === 'Enter'){
      this.searchCity();
    }
  }

  render(){
    if (this.state.redirectToCity){
      return(<Redirect to={`/cities/${this.state.searchCity}`}/>)
    }

    return (
      <Grid>
        <Jumbotron>
          <h2>Search a city:</h2>
          <Row>
            <Col md={10}>
              <FormGroup
                controlId="formBasicText"
              >
                <FormControl
                  type="text"
                  placeholder="Enter a city..."
                  onChange={this.handleSearchCityChange}
                  onKeyUp={this.enterListener}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button id='search_city_button' onClick={this.searchCity} >Search</Button>
            </Col>          
          </Row>
          <Button bsStyle="primary" bsSize="large" block onClick={this.takeMeAnyWhere} >
            Take me anywhere!
          </Button>
        </Jumbotron>
      </Grid>
      )
  }
}

export default Home;