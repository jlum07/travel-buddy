import React, {Component} from 'react';
import Navbar from 'react-bootstrap/lib/Navbar.js'
import Nav from 'react-bootstrap/lib/Nav.js'
import NavItem from 'react-bootstrap/lib/NavItem.js'
import NavDropdown from 'react-bootstrap/lib/NavDropdown.js'
import MenuItem from 'react-bootstrap/lib/MenuItem.js'

class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">TravelBuddy</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            Link
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;