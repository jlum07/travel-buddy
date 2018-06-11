import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import AddForm from './AddForm.jsx';
// import './AddCityModal.css';


class AddModal extends React.Component {

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
            <AddForm userId={this.props.userId} tripId={this.props.tripId} handleClose={this.handleClose} />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddModal;