import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import AddCityForm from './AddCityForm.jsx';
// import './AddCityModal.css';


class AddCityModal extends React.Component {

  constructor(props) {
    super(props);

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

  render(){
    return (
      <React.Fragment>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Add City
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <AddCityForm />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddCityModal;