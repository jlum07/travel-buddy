import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      failedLogin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value});
    // if (event.target.id === 'loginEmail'){
    //   this.setState({ email: event.target.value});
    // }
    // else if (event.target.id === 'loginPassword'){

    //   this.setState({ password: event.target.value});
    // }
  }

  handleSubmit(event){
    // SEND EMAIL AND PASSWORD TO BACKEND FOR VERIFICATION
    console.log(`email: ${this.state.email}, password: ${this.state.password} is trying to log in!`);
    event.preventDefault();
    if (this.state.email === 'ryan' && this.state.password === 'pass'){
      this.props.handleClose();      
    }
    else{
      this.setState({failedLogin: true})
    }
  }

  render() {

    const loginFailed = this.state.failedLogin ? (
      <Alert bsStyle="danger">Incorrect Login</Alert>
          ) : null;
    return (
      <form>
        <FormGroup>
          {loginFailed}
          <ControlLabel>Email</ControlLabel>
          <FormControl
            id='email'
            type="text"
            value={this.state.email}
            placeholder="your.name@example.com"
            onChange={this.handleChange}
          />
          <ControlLabel>Password</ControlLabel>
          <FormControl
            id='password'
            type="password"
            value={this.state.password}
            placeholder="enter password..."
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <Button bsStyle="primary" type='submit' onClick={this.handleSubmit}>Login</Button>
        </FormGroup>
      </form>
    );
  }
}

export default LoginForm;

