import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import TestForm from './components/TestForm.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <TestForm />
      </div>
    );
  }
}

export default App;
