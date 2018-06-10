import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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

    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?`, {
      params: {
        key: 'AIzaSyA26fShIA6heh3jhSTD81XSwkdnDDtYMOQ',
        types: '(cities)',
        input: this.state.name
      }
    })
    .then( response => {

      console.log(response);


    })
    .catch( error => {
      console.log("error: ", error);
    });



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

    const loginFailedMessage = this.state.failedAdd ? (
      <Alert bsStyle="danger">Failed to add city!</Alert>
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
          <FormControl.Feedback />
          <Button bsStyle="primary" type='submit' onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default AddForm;

