import React from 'react';
import { Redirect } from 'react-router';
import moment from 'moment';
import 'moment-timezone';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const timezone = moment.tz.guess();

class CreateTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      startDate: moment(Date.now()).tz(timezone).format("YYYY-MM-DD"),
      endDate: moment(Date.now()).tz(timezone).format("YYYY-MM-DD"),
      failedCreate: false
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

    axios.put('http://localhost:3001/trips', {
      // User ID
      user_id: 1,
      name: this.state.tripName,
      start_date: moment.utc(this.state.startDate),
      end_date: moment.utc(this.state.endDate) })
    .then((response)=>{
      console.log(response);

      if (response.status === 201){
        console.log('SUCCESSFULLY ADDED TRIP: ', response.data);
        // ADD Trip to state if successful
        window.location.reload();

        this.props.handleClose();
      }
      else if (response.status === 401){
        console.log('Failed login!')
        this.setState({failedCreate: true})
      }

    })
    .catch((error)=>{
      // IF LOGING UNSECCESFUL DUE TO NETWORK PROBLEM:
      console.log(error)
      this.setState({failedCreate: true});
    });
  }

  render() {

    const createFailedMessage = this.state.failedCreate ? (
      <Alert bsStyle="danger">Error</Alert>
          ) : null;

    return (
      <Form>
        <FormGroup>
          {createFailedMessage}
          <ControlLabel>Trip Name</ControlLabel>
          <FormControl
            id='tripName'
            type="text"
            value={this.state.name}
            placeholder="Trip Name"
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

export default CreateTripForm;

