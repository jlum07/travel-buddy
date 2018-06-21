import React, { Component } from "react";
import MapContainer from "./DashboardComponents/Map/MapContainer";
import CityCharContainer from "./DashboardComponents/CityChar/CityCharContainer";
import CityPercentageContainer from "./DashboardComponents/CityChar/CityPercentageContainer";
import WeatherContainer from "./DashboardComponents/Weather/WeatherContainer";
import ben from "./BenSpinning.png";
import CityModal from "./DashboardComponents/CityModal/CityModal.jsx";
import Dropdown from "./DashboardComponents/Dropdown/Dropdown.jsx";
import PoiList from "./DashboardComponents/PoiList/PoiList.jsx";
import Loading from "./DashboardComponents/Loading/Loading.jsx";
import map from "../imgs/map.png";
import star from "../imgs/star2.png";
import chart from "../imgs/chart.png";
import "./DashboardContainer.css";

import {
  ListGroup,
  ListGroupItem,
  Panel,
  Row,
  Col,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  ButtonGroup
} from "react-bootstrap";
//import { Parallax, Background } from "react-parallax"
import ScrollableAnchor from "react-scrollable-anchor";
import { configureAnchors, goToTop } from "react-scrollable-anchor";
import ReactLoading from "react-loading";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityChar: {},
      city_coordinates: {},
      city_name: {},
      points_of_interest: {},
      isLoaded: false,
      showModal: false,
      currentPin: {},
      currentCat: { eventKey: "top_poi", title: "Popular" },
      activeMarker: null,
      value: []
    };
  }

  handleDropdownClick = eventKey => {
    switch (eventKey) {
      case "top_poi":
        this.setState({
          currentCat: { eventKey: "top_poi", title: "Popular" }
        });
        break;
      case "museum_poi":
        this.setState({
          currentCat: { eventKey: "museum_poi", title: "Museum" }
        });
        break;
      case "food_poi":
        this.setState({
          currentCat: { eventKey: "food_poi", title: "Restaurant" }
        });
        break;
      case "nightlife_poi":
        this.setState({
          currentCat: { eventKey: "nightlife_poi", title: "Nightlife" }
        });
        break;
    }
    console.log(eventKey);
  };

  handleChange = e => {
    this.setState({ value: e });
  };

  toggleModal = (props, marker, e) => {
    if (this.state.showModal) {
      this.setState({
        showModal: false
        //activeMarker: null

        //currentPin: this.state.points_of_interest[props.name]
      });
    } else {
      console.log(
        "importat",
        this.state.points_of_interest[this.state.currentCat.eventKey],
        props
      );
      this.setState({
        showModal: true,
        currentPin: this.state.points_of_interest[
          this.state.currentCat.eventKey
        ][props.name]
      });
    }
  };

  modalLaunch = props => {
    this.toggleModal(props.currentTarget.dataset);
    console.log("hi hello", props.currentTarget.dataset.name);
  };

  setActiveMarker = props => {
    if (props == null) {
      this.setState({ activeMarker: null });
    } else {
      this.setState({
        activeMarker: { name: props.name, position: props.position }
      });
    }
  };

  componentDidMount() {
    configureAnchors({ offset: -65, scrollDuration: 1000 });
    const {
      match: { params }
    } = this.props;
    // console.log("mounted")

    fetch(`http://localhost:3001/city/${params.city}`)
      .then(response => {
        return response.json();
      })
      .then(cityData => {
        this.setState({
          cityChar: cityData.cityChar,
          city_coordinates: cityData.city_coordinates,
          city_name: cityData.city_name,
          points_of_interest: cityData.points_of_interest,
          isLoaded: true
        });
      });
  }

  render() {
    console.log('this.props.currentUser = ', this.props.currentUser);
    if (this.state.isLoaded) {
      return (
        <div>
          <div id="DashboardContainer">
            <ScrollableAnchor id={"section1"}>
              <div>
                <div id="PoiContainer">
                  <div id="MapContainer">
                    <MapContainer
                      toggleModal={this.toggleModal}
                      points_of_interest={this.state.points_of_interest}
                      city_coordinates={this.state.city_coordinates}
                      currentCat={this.state.currentCat}
                      setActiveMarker={this.setActiveMarker}
                      activeMarker={this.state.activeMarker}
                    />
                  </div>
                  <div id="poi-list-container">
                    <div id="poi-list">
                      <div>
                        <div id="DropdownContainer">
                          <Dropdown
                            currentCat={this.state.currentCat}
                            handleClick={this.handleDropdownClick}
                          />
                        </div>
                      </div>
                      <PoiList
                        points_of_interest={this.state.points_of_interest}
                        currentCat={this.state.currentCat}
                        setActiveMarker={this.setActiveMarker}
                        modalLaunch={this.modalLaunch}
                        toggleModal={this.toggleModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id={"section2"}>
              <div >
                <div id="CityCharContainer">
                  <div id="char-container">
                    <CityCharContainer CityChar={this.state.cityChar} />
                  </div>
                  <CityPercentageContainer CityChar={this.state.cityChar} currentUser={this.props.currentUser}/>
                </div>
                <div id="CityModalContainer">
                  <CityModal
                    toggleModal={this.toggleModal}
                    showModal={this.state.showModal}
                    currentPin={this.state.currentPin}
                  />
                </div>
              </div>
            </ScrollableAnchor>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default DashboardContainer;
