import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Travel Buddy</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>
            Sign In
          </NavItem>
          <NavItem>
            <Link to='/profile'>Profile</Link>
          </NavItem>
          <NavDropdown title="My Profile" id="basic-nav-dropdown">
            <MenuItem>Sign Out</MenuItem>
            <MenuItem>Other actions</MenuItem>
            <MenuItem>Other actions</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;


