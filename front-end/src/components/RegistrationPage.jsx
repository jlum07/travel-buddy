import React from 'react';
import { Redirect } from 'react-router-dom';
import { Jumbotron, Button, FormGroup, Col, Row, Grid, ControlLabel, FormControl } from 'react-bootstrap'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './RegistrationPage.css';

class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      rank_food: '',
      rank_arts: '',
      rank_nightlife: '',
      rank_safety: '',
      rank_price: '',
      password: '',
      password_confirmation: '',
      redirect_to_home: false,
      form_valid: true,
      invalid_form_message: ''
    };
  }


  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // }RIBUTE FROM FormGroup: validationState={this.getValidationState()}

  handleFormSubmit(event){
    axios({
      method: 'post',
      url: '//localhost:3001/users/register',
      data: {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        rank_food: this.state.rank_food,
        rank_arts: this.state.rank_arts,
        rank_nightlife: this.state.rank_nightlife,
        rank_safety: this.state.rank_safety,
        rank_price: this.state.rank_price,
        password: this.state.password
        }
    })
    .then((response)=>{
      console.log(response);
      if (response.status === 200){
        console.log('response status 200');
        // this.props.route.logIn(this.state.username); // this ?SHOULD? change the state of currentUser on the App component, which will re-render the home page
        this.setState({redirect_to_home: true})
      }
    })
    .catch((error)=>{
      console.log('Registration Failed: \n', error);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    if (this.state.redirect_to_home) {
      return (<Redirect to='/'/>)
    }

    return (
      <Jumbotron>
        <FormGroup>
          <Grid>
          <h1>Join the Club</h1>
          <br></br>
            <Row>
              <Col md={6}>
                <FormControl
                  id='firstName'
                  type="text"
                  value={this.state.firstName}
                  placeholder="*First Name"
                  onChange={this.handleChange}
                />
              </Col>
              <Col md={6}>
                <FormControl
                  id='lastName'
                  type="text"
                  value={this.state.lastName}
                  placeholder="*Last Name"
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <FormControl
              id='username'
              type="text"
              value={this.state.username}
              placeholder="*Username"
              onChange={this.handleChange}
            />
            <FormControl
              id='email'
              type="text"
              value={this.state.email}
              placeholder="*Email"
              onChange={this.handleChange}
            />
            <FormControl
              id='password'
              type="password"
              value={this.state.password}
              placeholder="*Password"
              onChange={this.handleChange}
            />
            <FormControl
              id='password_confirmation'
              type="password"
              value={this.state.password_confirmation}
              placeholder="*Confirm Password"
              onChange={this.handleChange}
            />
            <br></br>
            <br></br>

            <ControlLabel>Preferences</ControlLabel>
            <br/>
            <FormControl
              // className="range-slider"
              id='rank_food'
              type="number"
              min="1"
              max="10"
              step="1"
              list="num-list"
              value={this.state.rank_food}
              placeholder="Rank Food from 1 to 10"
              onChange={this.handleChange}
            />
            <datalist id="food-tm">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="4" />
              <option value="5" />
              <option value="6" />
              <option value="7" />
              <option value="8" />
              <option value="9" />
              <option value="10" />
            </datalist>

            <FormControl
              id='rank_arts'
              type="number"
              min="1"
              max="10"
              step="1"
              list="num-list"
              value={this.state.rank_arts}
              placeholder="Rank Arts from 1 to 10"
              onChange={this.handleChange}
            />
            <FormControl
              id='rank_nightlife'
              type="number"
              min="1"
              max="10"
              step="1"
              list="num-list"
              value={this.state.rank_nightlife}
              placeholder="Rank Price from 1 to 10"
              onChange={this.handleChange}
            />
            <FormControl
              id='rank_safety'
              type="number"
              min="1"
              max="10"
              step="1"
              list="num-list"
              value={this.state.rank_safety}
              placeholder="Rank safety from 1 to 10"
              onChange={this.handleChange}
            />
            <FormControl
              id='rank_price'
              type="number"
              min="1"
              max="10"
              step="1"
              list="num-list"
              value={this.state.rank_price}
              placeholder="Rank Price from 1 to 10"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
          </Grid>
        </FormGroup>
        <Button bsStyle='primary' id='register_button' onClick={this.handleFormSubmit}>Register!!</Button>
      </Jumbotron>
    );
  }
}

export default RegistrationPage;