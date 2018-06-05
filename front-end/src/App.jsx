import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import MapContainer from './components/mapContainer.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer />
      </div>
    );
  }
}

export default App;
