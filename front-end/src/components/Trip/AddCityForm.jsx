import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class AddCityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      startDate: Date.now(),
      endDate: Date.now(),
      failedAdd: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.id]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();

    // EDIT THIS!!!!
    axios.post('http://localhost:3001/trips', {
      // User ID
      cityName: this.state.name,
      start_date: this.state.startDate,
      end_date: this.state.endDate })
    .then((response)=>{
      console.log(response);

      if (response.status === 202){
        console.log('SUCCESSFULLY ADDED CITY: ', response.data);
        // this.props.logIn(response.data);
        // ADD Trip to state if successful
        // this.props.handleClose();
      }
      else if (response.status === 401){
        console.log('Failed to add city!')
        this.setState({failedAdd: true})
      }

    })
    .catch((error)=>{
      // IF LOGING UNSECCESFUL DUE TO NETWORK PROBLEM:
      console.log(error)
      this.setState({failedAdd: true});
    });
  }

  render() {

    const loginFailedMessage = this.state.failedLogin ? (
      <Alert bsStyle="danger">Incorrect Login</Alert>
          ) : null;

    return (
      <Form>
        <FormGroup>
          {loginFailedMessage}
          <ControlLabel>Trip Name</ControlLabel>
          <FormControl
            id='city'
            type="text"
            value={this.state.city}
            placeholder="City"
            onChange={this.handleInputChange}
          />
          <ControlLabel>Start Date</ControlLabel>
          <FormControl
            id='startDate'
            type="date"
            value={this.state.startDate}
            onChange={this.handleInputChange}
          />
          <ControlLabel>End Date</ControlLabel>
          <FormControl
            id='endDate'
            type="date"
            value={this.state.endDate}
            onChange={this.handleInputChange}
          />
          <FormControl.Feedback />
          <Button bsStyle="primary" type='submit' onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default AddCityForm;

