import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert, Glyphicon } from 'react-bootstrap';
import axios from 'axios';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.event.id,
      name: this.props.event.name,
      description: this.props.event.description,
      startDate: this.props.event.start_date,
      endDate: this.props.event.end_date,
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
    // console.log(this.props.match.id);
    // EDIT THIS!!!!
    axios.post(`http://localhost:3001/trips/editItinerary`, {
      // User ID
      // City ID???
      id: this.state.id,
      userId: this.state.userId,
      name: this.state.name,
      description: this.state.description,
      start_date: this.state.startDate,
      end_date: this.state.endDate
    })
    .then((response)=>{
      console.log(response);

      if (response.status === 201){
        console.log('SUCCESSFULLY ADDED CITY: ', response.data);
        // this.props.logIn(response.data);
        // ADD Trip to state if successful
        // this.props.handleClose();
        window.location.reload();
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

    const loginFailedMessage = this.state.failedAdd ? (
      <Alert bsStyle="danger">Failed to edit city details</Alert>
          ) : null;

    return (
      <Form>
        <FormGroup>
          {loginFailedMessage}
          <ControlLabel>Trip Name</ControlLabel>
          <FormControl
            id='name'
            type="text"
            value={this.state.name}
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
          <ControlLabel>Description</ControlLabel>
          <FormControl
            id='description'
            componentClass="textarea"
            rows={3}
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <FormControl.Feedback />
          <Button bsStyle="primary" type='submit' onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default EditForm;

