import React from 'react';
import { Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap'
//import MapContainer from './mapContainer.jsx';
import axios from 'axios';
import Map from './DashboardComponents/Map/MapContainer.jsx'
import GalleryModal from './GalleryModal.jsx'
import './ShowCity.css';

export default class ShowCity extends React.Component {
  constructor(){
    super()
    this.state = {
      localWeather: {}
    };
    this.handleGetWeather = this.handleGetWeather.bind(this);
  }

  handleGetWeather(){
    // console.log(this);
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=houston&APPID=b8398cdd6d234d51ffc40fb334491217')
    .then((response) => {
      console.log(response);
      this.setState({localWeather: response});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount(){
    console.log(this);
  }

  render(){
    return (
      <Grid>
        <h1>{this.props.match.params.city}</h1>
        <Row>
          <Col xs={12} md={8}>
          </Col>
          <Col xs={12} md={4}>
            <Jumbotron id='poi_list'>
              <GalleryModal />
              <ul>
                <li>CN tower</li>
                <li>Ripleys</li>
                <li>Skydome</li>
                <li>BMO Feild</li>
              </ul>
            </Jumbotron>
          </Col>
        </Row>
        <Button onClick={this.handleGetWeather}>Get Weather</Button>
        <a>{JSON.stringify(this.state.localWeather)}</a>
      </Grid>
      )
  }
}


