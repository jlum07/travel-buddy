import React from 'react';
import { Modal } from 'react-bootstrap'
import './GalleryModal.css';

class GalleryModal extends React.Component {

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

  render(){
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>



      </Modal>
    );
  }
}

export default GalleryModal;