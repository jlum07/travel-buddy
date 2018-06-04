import React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, Col, Row, Grid } from 'react-bootstrap'
import './Home.css';

class Home extends React.Component {
  render(){
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
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button id='search_city_button'>Search</Button>
            </Col>          
          </Row>
          <Button bsStyle="primary" bsSize="large" block>
            Take me anywhere!
          </Button>
        </Jumbotron>
      </Grid>
      )
  }
}

export default Home;