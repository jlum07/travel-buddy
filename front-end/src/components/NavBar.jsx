import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import LoginModalLauncher from './LoginModalLauncher.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
  }

  logout(){
    console.log('LOGGIN OUT!')
    axios.delete('http://localhost:3001/user/logout')
    .then((response)=>{console.log(response);})
    .catch((error)=>{console.log(error);});
  }

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
            <LoginModalLauncher />
          </NavItem>
          <NavItem>
            <Button bsStyle="primary" onClick={this.logout}>Logout</Button>
          </NavItem>
          <NavItem componentClass={Link} href='/profile' to='/profile'>
            Profile
          </NavItem>
          <NavItem componentClass={Link} href='/register' to='/register'>
            Register
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


