import React from "react";
import { Modal, Button, Tabs, Tab, Jumbotron } from "react-bootstrap";
import InstaCarousel from "./InstaCarousel.jsx";
import SnapCarousel from "./SnapCarousel.jsx";
import './CityModal.css';

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

  render() {
    let snapStatus = false;
    if (this.props.currentPin.snapchat === "No Snaps!") {
      snapStatus = true;
    }
    //if (this.props.currentPin.snapchat !== "No Snaps!") {
    return (
      <React.Fragment>
        <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
          <Jumbotron>
            <h3>{this.props.currentPin.title}</h3>
            <p>
              {this.props.currentPin.ranking}
            </p>
            <p>
              <Button bsStyle="primary" href={`https://${this.props.currentPin.trip_advisor_link}`} target="_blank" > <img class="trip_advisor_link" src="https://static.tacdn.com/img2/branding/rebrand/TA_logo_primary.png"/> </Button>
            </p>
          </Jumbotron>;
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Instagram">
              <InstaCarousel />
            </Tab>
            <Tab eventKey={2} title="SnapChat" disabled={snapStatus}>
              {this.props.currentPin.snapchat !== "No Snaps!" && (
                <SnapCarousel snapchats={this.props.currentPin.snapchat} />
              )}
            </Tab>
          </Tabs>
        </Modal>
      </React.Fragment>
    );
  }
}

export default GalleryModal;
