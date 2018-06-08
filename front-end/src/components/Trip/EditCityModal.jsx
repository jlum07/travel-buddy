import React from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap'
import EditCityForm from './EditCityForm.jsx';


class EditCityModal extends React.Component {

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
            <EditCityForm city={this.props.city} />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditCityModal;