import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'loginEmail'){
      this.setState({ email: event.target.value});
    }
    else if (event.target.id === 'loginPassword'){

      this.setState({ password: event.target.value});
    }
  }

  handleSubmit(event){
    // SEND EMAIL AND PASSWORD TO BACKEND FOR VERIFICATION
    console.log(`email: ${this.state.email}, password: ${this.state.password} is trying to log in!`);
    event.preventDefault();
    this.props.handleClose();
  }

  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            id='loginEmail'
            type="text"
            value={this.state.email}
            placeholder="your.name@example.com"
            onChange={this.handleChange}
          />
          <ControlLabel>Password</ControlLabel>
          <FormControl
            id='loginPassword'
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

