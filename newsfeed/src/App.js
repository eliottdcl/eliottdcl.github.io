import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FetchCall from './fetchCall'


class App extends Component {
  render() {
    return (
      <div className="App">
        <FetchCall />
      </div>
    );
  }
}

export default App;
