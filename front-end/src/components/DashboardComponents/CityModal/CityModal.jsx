import React from "react";
import {
  Modal,
  Button,
  Tabs,
  Tab,
  Jumbotron,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import InstaCarousel from "./InstaCarousel.jsx";
import SnapCarousel from "./SnapCarousel.jsx";
import "./CityModal.css";
import Streetview from "./Streetview.jsx";
import apikey from "../Map/apikey";

class GalleryModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      // show: false,
      visible: false

    };
  }

  // handleClose() {
  //   this.setState({ show: false });
  // }

  // handleShow() {
  //   this.setState({ show: true });
  // }

  onHide = (props, marker, e) => {
    this.props.toggleModal(props, marker, e)
    this.setState({ visible: false })
  }



  handleTabSelect = key => {
    // alert(`selected ${key}`);

    if (key === 4) {
      setTimeout(() => {
        this.setState({ visible: true });
        console.log("set");
      }, 400);
    }
  };

  componentDidMount() {}

  render() {
    let snapStatus = false;
    if (this.props.currentPin.snapchat === "No Snaps!") {
      snapStatus = true;
    }
    //if (this.props.currentPin.snapchat !== "No Snaps!") {
    return (
      <React.Fragment>
        <Modal show={this.props.showModal} onHide={this.onHide}>
          <Tabs
            className="tab-container"
            defaultActiveKey={1}
            id="tab-container"
            activeKey={this.state.key}
            onSelect={this.handleTabSelect}
          >
            <Tab eventKey={1} title="TripAdvisor">
              <Jumbotron className="jumbotron">
                <h3>{this.props.currentPin.title}</h3>
                <p>{this.props.currentPin.ranking}</p>

                <p>
                  <Button
                    bsStyle="primary"
                    href={`https://${this.props.currentPin.trip_advisor_link}`}
                    target="_blank"
                  >
                    {" "}
                    <img
                      class="trip_advisor_link"
                      src="https://static.tacdn.com/img2/branding/rebrand/TA_logo_primary.png"
                    />{" "}
                  </Button>
                </p>
              </Jumbotron>
            </Tab>

            <Tab eventKey={2} title="Instagram">
              <InstaCarousel />
            </Tab>
            <Tab eventKey={3} title="SnapChat" disabled={snapStatus}>
              {this.props.currentPin.snapchat !== "No Snaps!" && (
                <SnapCarousel
                  snapchats={this.props.currentPin.snapchat}
                  playSnaps={this.state.playSnaps}
                />
              )}
            </Tab>
            <Tab eventKey={4} title="Streetview">
              <Streetview
                center={this.props.currentPin.location}
                visible={this.state.visible}
              />
            </Tab>
          </Tabs>
        </Modal>
      </React.Fragment>
    );
  }
}

export default GalleryModal;
