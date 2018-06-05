import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      failedLogin: false
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event) {
    this.setState({ [event.target.id]: event.target.value});
    // if (event.target.id === 'loginEmail'){
    //   this.setState({ email: event.target.value});
    // }
    // else if (event.target.id === 'loginPassword'){
    //   this.setState({ password: event.target.value});
    // }
  }

  handleSubmit(event){
    // SEND EMAIL AND PASSWORD TO BACKEND SERVER FOR VERIFICATION
    console.log(`email: ${this.state.email}, password: ${this.state.password} is trying to log in!`);
    // console.log('this = ', this); // 'this' WORKS here
    event.preventDefault();

    axios.post('http://localhost:3001/user/login', {
      email: this.state.email,
      password: this.state.password })
    .then((response)=>{

      console.log(response)}
      // if (LOGIN SUCCESFUL){
      //   this.props.handleClose();
      //   // SHOULD RECEIVE A COOKIE WHICH INDICATES THAT THE USER IS LOGGED IN
      // }
      // else {
      //   this.setState({failedLogin: true})
      // }
    )
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
      <form>
        <FormGroup>
          {loginFailedMessage}
          <ControlLabel>Email</ControlLabel>
          <FormControl
            id='email'
            type="text"
            value={this.state.email}
            placeholder="your.name@example.com"
            onChange={this.handleTextChange}
          />
          <ControlLabel>Password</ControlLabel>
          <FormControl
            id='password'
            type="password"
            value={this.state.password}
            placeholder="enter password..."
            onChange={this.handleTextChange}
          />
          <FormControl.Feedback />
          <Button bsStyle="primary" type='submit' onClick={this.handleSubmit}>Login</Button>
        </FormGroup>
      </form>
    );
  }
}

export default LoginForm;

