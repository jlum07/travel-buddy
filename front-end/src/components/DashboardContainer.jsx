import React, { Component } from "react";
import MapContainer from "./DashboardComponents/Map/MapContainer";
import CityCharContainer from "./DashboardComponents/CityChar/CityCharContainer";
import WeatherContainer from "./DashboardComponents/Weather/WeatherContainer";
import ben from "./BenSpinning.png";
import CityModal from "./DashboardComponents/CityModal/CityModal.jsx";
import Dropdown from "./DashboardComponents/Dropdown/Dropdown.jsx";
import PoiList from "./DashboardComponents/PoiList/PoiList.jsx";
import "./DashboardContainer.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class DashboardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cityChar: {},
      city_coordinates: {},
      city_name: {},
      points_of_interest: {},
      isLoaded: false,
      showModal: false,
      currentPin: {},
      currentCat: { eventKey: "top_poi", title: "Popular" },
      activeMarker: null
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
    }
    console.log(eventKey);
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
    const {
      match: { params }
    } = this.props;
    // console.log("mounted");

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

    if (this.state.isLoaded) {
      return (
        <div id="DashboardContainer">
          <div id="PoiContainer">
            <div id="MapContainer" style={{ width: '100%', height: '100%' }}>
              <MapContainer
                toggleModal={this.toggleModal}
                points_of_interest={this.state.points_of_interest}
                city_coordinates={this.state.city_coordinates}
                currentCat={this.state.currentCat}
                setActiveMarker={this.setActiveMarker}
                activeMarker={this.state.activeMarker}
              />
            </div>
            <div id="poi-list">
              <div>
                POI List
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

          <div id="CityCharContainer">
            <CityCharContainer CityChar={this.state.cityChar} />
          </div>
          <div id="CityModalContainer">
            <CityModal
              toggleModal={this.toggleModal}
              showModal={this.state.showModal}
              currentPin={this.state.currentPin}
            />
          </div>
        </div>
      );
    } else {
      return <img className="image" src={ben} />;
    }
  }
}

export default DashboardContainer;
