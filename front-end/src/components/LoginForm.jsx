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
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post('https://travel-buddy2.herokuapp.com/users/login', {
      email: this.state.email,
      password: this.state.password })
    .then((response)=>{

      // console.log(response.data);

      if (response.status === 202){
        console.log('SUCCESSFUL LOGIN: ', response.data);
        this.props.logIn(response.data);
        localStorage.setItem('session_token', response.data.session_token);
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
      // this.setState({failedLogin: true});
    });
  }

  render() {
    const loginFailedMessage = this.state.failedLogin ? (
      <Alert bsStyle="danger">Incorrect Login</Alert>
          ) : null;
    return (
      <form>
          {loginFailedMessage}
        <FormGroup>
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

