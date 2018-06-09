import React, { Component } from "react";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import ShowCity from "./components/ShowCity.jsx";
import Profile from "./components/Profile.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import DashboardContainer from "./components/DashboardContainer.jsx";
import MapContainer from "./components/DashboardComponents/Map/MapContainer.jsx";
import Trips from "./components/Trips.jsx";
import Trip from "./components/Trip.jsx";
import MorphGraph from "./components/DashboardComponents/CityChar/CityCharContainer.jsx";
import axios from 'axios';
require('dotenv').config()

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        id: null,
        username: null, // will be null when not logged on
        // firstName: null,
        // lastName: null,
        // email: null,
        // rank_food: null,
        // rank_arts: null,
        // rank_nightlife: null,
        // rank_history: null,
        // rank_price: null,
        // profilePic: null
      }
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(userData) {
    // console.log("inside logIn, userData = ", userData);
    this.setState({
      currentUser: {
        id: userData.id,
        username: userData.username,
        // firstName: userData.first_name,
        // lastName: userData.last_name,
        // email: userData.email,
        // rank_food: userData.food_rank,
        // rank_arts: userData.arts_rank,
        // rank_nightlife: userData.nightlife_rank,
        // rank_history: userData.history_rank,
        // rank_price: userData.price_rank,
        // profilePic: userData.profile_pic
      }
    });
  }

  logOut() {
    let currentSessionToken = localStorage.getItem('session_token');

    if (currentSessionToken){
      axios.delete('http://localhost:3001/users/logout', {
          headers: {
            session_token: currentSessionToken
          }
        })
      .then((response)=>{
        console.log(response);
        localStorage.setItem('session_token', null);
      })
      .catch((error)=>{console.log(error);});
     
    }






    this.setState({
      currentUser: {
        id: null,
        username: null,
        // firstName: null,
        // lastName: null,
        // email: null,
        // rank_food: null,
        // rank_arts: null,
        // rank_nightlife: null,
        // rank_history: null,
        // rank_price: null,
        // profilePic: null
      }
    });
  }

  componentDidMount(){
    let currentSessionToken = localStorage.getItem('session_token');

    if (currentSessionToken){
      console.log('there was a session token');

      axios.get('http://localhost:3001/users/basic_data', {
        headers: {
          session_token: currentSessionToken
        }
      })
      .then((response)=>{
        console.log('response.data = ', response.data);
        this.setState({
          currentUser: {
            id: response.data.id,
            username: response.data.username
          }
        })
      })
      .catch((error)=>{
        console.log(error);
      });
    }
  }

  render() {
    const RegistrationPageWithProps = props => {
      return <RegistrationPage logIn={this.logIn} {...props} />;
    };
    const ProfileWithProps = props => {
      return <Profile currentUser={this.state.currentUser} {...props} />;
    };

    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar
              logIn={this.logIn}
              logOut={this.logOut}
              currentUser={this.state.currentUser}
            />
            <Route exact path="/" component={Home} />
            <Route path="/cities/:city" component={ShowCity} />
            <Route path="/trips" component={Trips} />
            <Route path="/trip/:id" component={Trip} />
            <Route path="/map" component={MapContainer} />
            <Route path="/profile" render={ProfileWithProps} />
            <Route path="/register" render={RegistrationPageWithProps} />
            <Route path="/graph" component={MorphGraph} />
            <Route path="/dashboard/:city" component={DashboardContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
