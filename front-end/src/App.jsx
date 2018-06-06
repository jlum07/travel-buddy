import React, { Component } from "react";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import ShowCity from "./components/ShowCity.jsx";
import Profile from "./components/Profile.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import DashboardContainer from "./components/DashboardContainer.jsx";
import MapContainer from "./components/DashboardComponents/Map/MapContainer.jsx"
import Trips from './components/Trips.jsx';
import Trip from './components/Trip.jsx';

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentUser: null // will be null when not logged on
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(username){
    this.setState({ currentUser: username });
  }

  logOut(){
    this.setState({ currentUser: null });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar logIn={this.logIn} logOut={this.logOut} currentUser={this.state.currentUser} />
            <Route exact path='/' component={Home} />
            <Route path='/cities/:city' component={ShowCity} />
            <Route path='/profile' component={Profile} />
            <Route path='/register' component={RegistrationPage} logIn={this.logIn} />
            <Route path='/trips' component={Trips} />
            <Route path='/trip/:id' component={Trip} />
            <Route path="/map" component={MapContainer} />
          </div>
        </BrowserRouter>
        <div className="App">
          <DashboardContainer />
        </div>
      </div>
    );
  }
}

export default App;
