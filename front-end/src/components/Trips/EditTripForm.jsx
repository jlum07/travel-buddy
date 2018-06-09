import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert, Glyphicon } from 'react-bootstrap';
import axios from 'axios';

class EditTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // USER ID????
      tripID: this.props.trip.id,
      tripName: this.props.trip.name,
      startDate: this.props.trip.start_date,
      endDate: this.props.trip.end_date,
      failedEdit: false
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
      // Trip ID
      user_id: 1,
      trip_id: this.state.tripID,
      name: this.state.tripName,
      start_date: this.state.startDate,
      end_date: this.state.endDate
    })
    .then((response)=>{
      console.log(response);
      window.location.reload();

      if (response.status === 202){
        console.log('SUCCESSFULLY EDITED TRIP: ', response.data);
        // this.props.logIn(response.data);
        // ADD Trip to state if successful
        // this.props.handleClose();
        window.location.reload();
      }
      else if (response.status === 401){
        console.log('Failed to add city!')
        this.setState({failedEdit: true})
      }

    })
    .catch((error)=>{
      // IF LOGING UNSECCESFUL DUE TO NETWORK PROBLEM:
      console.log(error)
      this.setState({failedEdit: true});
    });
  }

  render() {

    const loginFailedMessage = this.state.failedLogin ? (
      <Alert bsStyle="danger">Failed to edit trip</Alert>
          ) : null;

    return (
      <Form>
        <FormGroup>
          {loginFailedMessage}
          <ControlLabel>Trip Name</ControlLabel>
          <FormControl
            id='tripName'
            type="text"
            value={this.state.tripName}
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

export default EditTripForm;