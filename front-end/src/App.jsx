import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
<<<<<<< 570553ca23cb81a423e8b4cb4ca2f1bbf5ab4179
import MapContainer from './components/mapContainer.jsx'
=======
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ShowCity from './components/ShowCity.jsx';
import Profile from './components/Profile.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
>>>>>>> created registration page

class App extends Component {
  render() {
    return (
<<<<<<< 570553ca23cb81a423e8b4cb4ca2f1bbf5ab4179
      <div className="App">
        <MapContainer />
=======
      <div>
        <BrowserRouter>
          <div>
            <NavBar/>
            <Route exact path='/' component={Home} />
            <Route path='/cities/:city' component={ShowCity} />
            <Route path='/profile' component={Profile} />
            <Route path='/register' component={RegistrationPage} />
          </div>
        </BrowserRouter>
>>>>>>> created registration page
      </div>
    );
  }
}

export default App;
