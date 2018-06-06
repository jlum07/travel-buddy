import React, { Fragment } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import LoginModalLauncher from './LoginModalLauncher.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
    this.renderNavItems = this.renderNavItems.bind(this)
  }

  logout(){
    console.log('LOGGING OUT!')
    axios.delete('http://localhost:3001/users/logout')
    .then((response)=>{console.log(response);})
    .catch((error)=>{console.log(error);});

    this.props.logOut();
  }

  renderNavItems() {
    if (this.props.currentUser.username) {
      return (
        <Fragment>
          <NavItem componentClass={ Link } href='/profile' to='/profile'>
            <Button bsStyle="primary">{this.props.currentUser.username}</Button>
          </NavItem>
          <NavItem>
            <Button bsStyle="primary" onClick={this.logout}>Logout</Button>
          </NavItem>
        </Fragment>)
    } else {
      return (
        <Fragment>
          <NavItem>
            <LoginModalLauncher logIn={this.props.logIn} />
          </NavItem>
          <NavItem componentClass={ Link } href='/register' to='/register'>
            <Button bsStyle="primary">Register</Button>
          </NavItem>
        </Fragment>
      )
    }
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
            { this.renderNavItems() }
{/*          <NavDropdown title="My Profile" id="basic-nav-dropdown">
            <MenuItem>Sign Out</MenuItem>
            <MenuItem>Other actions</MenuItem>
            <MenuItem>Other actions</MenuItem>
          </NavDropdown>*/}
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;


