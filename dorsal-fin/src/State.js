import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class State extends Component {
      constructor(props){
        super(props)
        this.state={}
      }

  render() {
    return (
      <div className="state">
        <div>State: {this.props.key}</div>
      </div>
    );
  }
}

export default State;
