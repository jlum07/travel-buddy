import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import "./Dropdown.css";

class Dropdown extends React.Component {
  render() {
    return (
      <DropdownButton title={this.props.currentCat.title} key={1} id={`sup`}>
        <MenuItem onSelect={this.props.handleClick} eventKey="top_poi">
          Popular
        </MenuItem>
        <MenuItem onSelect={this.props.handleClick} eventKey="museum_poi">
          Museum
        </MenuItem>
        <MenuItem onSelect={this.props.handleClick} eventKey="food_poi">
          Restaurants
        </MenuItem>
      </DropdownButton>
    );
  }
}

export default Dropdown;
