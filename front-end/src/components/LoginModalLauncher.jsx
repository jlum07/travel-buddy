import React from 'react';
import LoginForm from './LoginForm.jsx';
import { Modal, Button  } from 'react-bootstrap';

class LoginModalLauncher extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    // console.log('inside Login Modal laincher render');
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Login
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm handleClose={this.handleClose} logIn={this.props.logIn}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LoginModalLauncher;
