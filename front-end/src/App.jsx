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
  render() {
    return (
      <div>
        <div>
          <BrowserRouter>
            <div>
              <NavBar />
              <Route exact path="/" component={Home} />
              <Route path="/cities/:city" component={ShowCity} />
              <Route path="/profile" component={Profile} />
              <Route path="/map" component={MapContainer} />
              <Route path="/register" component={RegistrationPage} />
              <Route path='/trips' component={Trips} />
              <Route path='/trip/:id' component={Trip} />
            </div>
          </BrowserRouter>
        </div>
        <div className="App">
          <DashboardContainer />
        </div>
      </div>
    );
  }
}

export default App;
