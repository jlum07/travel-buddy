import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      type: 'City',
      startDate: null,
      endDate: null,
      description: '',
      failedAdd: false,
      failedAddMessage: 'failed to add because...',
      userId: this.props.userId,
      tripId: this.props.tripId
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    // console.log(event.target.value);
    this.setState({ [event.target.id]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    if (this.state.name === null){
      this.setState({
        failedAdd: true,
        failedAddMessage: 'Please Enter a city name'
      });
      return;
    }
    else if (this.state.startDate === null || this.state.endDate === null){
      this.setState({
        failedAdd: true,
        failedAddMessage: 'Please Enter start/end dates'
      });
      return;
    }

    let body = {
      cityName: this.state.name,
      userId: this.state.userId,
      type: 'City',
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    axios.post(`http://localhost:3001/trips/${this.state.tripId}/addplace`, body)
    .then(response=>{
      console.log(response);
      if (response.status === 200){
        // Redirect back to trip page
        this.props.handleClose();
        window.location.reload();
      }
      else if (response.status === 206) {
        console.log('Cannot find city');
        this.setState({
          failedAdd: true,
          failedAddMessage: 'City Name Invalid!'
        });
      }
      else if (response.status === 500){
        this.setState({
          failedAdd: true,
          failedAddMessage: 'Server Error...'
        });
      }
      else {
        this.setState({
          failedAdd: true,
          failedAddMessage: 'Some other error...'
        });
      }




       })
    .catch(error =>{
      console.log('Could not connect to server: ', error);

      this.setState({

        failedAdd: true,
        failedAddMessage: 'Could not connect to server' });
       });

    // axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?`, {
    //   params: {
    //     key: 'AIzaSyA26fShIA6heh3jhSTD81XSwkdnDDtYMOQ',
    //     types: '(cities)',
    //     input: this.state.name
    //   }
    // })
    // .then( response => {

    //   console.log(response);


    // })
    // .catch( error => {
    //   console.log("error: ", error);
    // });


    // EDIT THIS!!!!
    // axios.put(`http://localhost:3001/trips/${1}`, {
    //   // User ID
    //   name: this.state.name,
    //   type: this.state.type,
    //   start_date: this.state.startDate,
    //   end_date: this.state.endDate })
    // .then((response)=>{
    //   console.log(response);

    //   if (response.status === 202){
    //     console.log('SUCCESSFULLY ADDED EVENT: ', response.data);
    //     // this.props.logIn(response.data);
    //     // ADD Trip to state if successful
    //     // this.props.handleClose();
    //   }
    //   else if (response.status === 401){
    //     console.log('Failed to add event!')
    //     this.setState({failedAdd: true})
    //   }

    // })
    // .catch((error)=>{
    //   // IF LOGING UNSECCESFUL DUE TO NETWORK PROBLEM:
    //   console.log(error)
    //   this.setState({failedAdd: true});
    // });


  }

  render() {

    const addFailedMessage = this.state.failedAdd ? (
      <Alert bsStyle="danger">Error: {this.state.failedAddMessage}</Alert>
          ) : null;

    return (
      <Form>
        <FormGroup>
          {addFailedMessage}
          <ControlLabel>Name</ControlLabel>
          <FormControl
            id='name'
            type="text"
            value={this.state.name}
            placeholder="Name"
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
          <Button bsStyle="default" type='submit' onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default AddForm;

