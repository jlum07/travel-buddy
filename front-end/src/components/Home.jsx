import React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, Col, Row, Grid, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchCity: null,
      redirectToCity: false,
      searchError: false
    };
    this.handleSearchCityChange = this.handleSearchCityChange.bind(this);
    this.searchCity = this.searchCity.bind(this);
    this.takeMeAnyWhere = this.takeMeAnyWhere.bind(this);
    this.enterListener = this.enterListener.bind(this);
  }

  takeMeAnyWhere(){
    let randomIndex = Math.floor(Math.random()*7+1);
    let randonCityList = ['Toronto', 'Barcelona', 'Bangkok', 'Munich', 'Houston', 'Rome', 'Cairo']
    this.setState({
      searchCity: randonCityList[randomIndex],
      redirectToCity: true
    });
  }

  searchCity(){
    axios.get(`http://localhost:3001/city/autocorrect/${this.state.searchCity}`)
    .then((response)=>{
      // console.log('response = ', response);
      if (response.status === 204){
        // console.log('City Not Found');
        this.setState({searchError: true})
      } else {
        this.setState({
          searchCity: response.data, 
          redirectToCity: true,
          searchError: false
          });        
      }
    })
    .catch((error)=>{console.log(error);})



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
    var searchError = this.state.searchError?
      (<Alert bsStyle="danger">{this.state.searchCity} Not Found</Alert>) : (null);


    if (this.state.redirectToCity){
      return(<Redirect to={`/cities/${this.state.searchCity}`}/>)
    }



    return (
      <Grid>
        <Jumbotron>
          <h2>Search a city:</h2>
          {searchError}
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