import React from 'react';
import NavBar from './components/NavBar.jsx';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home.jsx'
import ShowCity from './components/ShowCity.jsx'
import Profile from './components/Profile.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar/>
            <Route exact path='/' component={Home} />
            <Route path='/cities/:city' component={ShowCity} />
            <Route path='/profile' component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

