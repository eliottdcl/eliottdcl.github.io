import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Report extends Component {
      constructor(props){
        super(props)
        this.state={}
      }

  render() {
    return (
      <div className="report">
        <div>State: {this.props.state}</div>
        <div>Zone: {this.props.zone}</div>
        <div>Breed: {this.props.breed}</div>
        <div>Reported at: {this.props.time}</div>
        <div></div>
      </div>
    );
  }
}

export default Report;
