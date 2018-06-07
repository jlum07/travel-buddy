import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class CreateTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      startDate: Date.now(),
      endDate: Date.now(),
      failedLogin: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.id);
    this.setState({ [event.target.id]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post('http://localhost:3001/trips', {
      // User ID
      name: this.state.name,
      start_date: this.state.startDate,
      end_date: this.state.endDate })
    .then((response)=>{
      console.log(response);

      if (response.status === 202){
        console.log('SUCCESSFULLY ADDED TRIP: ', response.data);
        this.props.logIn(response.data);
        // ADD Trip to state if successful
        // this.props.handleClose();
      }
      else if (response.status === 401){
        console.log('Failed login!')
        this.setState({failedLogin: true})
      }

    })
    .catch((error)=>{
      // IF LOGING UNSECCESFUL DUE TO NETWORK PROBLEM:
      console.log(error)
      this.setState({failedLogin: true});
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

