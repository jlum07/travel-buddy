import React from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap'
import EditTripForm from './EditTripForm.jsx';


class EditTripModal extends React.Component {

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
        <Button bsStyle="default" onClick={this.handleShow}>
          <Glyphicon glyph="pencil" />
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <EditTripForm trip={this.props.trip} />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditTripModal;