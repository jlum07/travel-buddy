import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import DashboardContainer from './components/DashboardContainer.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <DashboardContainer />
      </div>
    );
  }
}

export default App;
