import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Report from './Report';
import State from './State';
import has from 'lodash/has';
import _ from 'lodash';

class App extends Component {
      constructor(props){
        super(props)
        this.state={
          reports: [],
          breeds: [],
          dataloaded: false,
          stateset: [],
          breedscount:[],
          statecount: [],
        }
      }

componentDidMount(){
  this.getReports()
  // this.tryLodash()
  // this.getBreeds()
  // this.getStates2()
}

getReports = () => {
  fetch('https://www.dorsalwatch.com/api/public/report/list', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    country: "Australia",
    timeRange: 0,
    pageIndex: 0,
    pageSize: 50,
    publicKey: "ab61cd9427bea80f22e641c04c312195"
  })
}).then(response => response.json()).then(payload => {

  const reportobj = payload.responseData.map(report => {
    return {
      key: report.id,
      coordinate: report.coordinate,
      distanceFromShore: report.distanceFromShore,
      reportTime: report.reportTime,
      sharkLength: report.sharkLength,
      state: report.state,
      typeOfEncounter: report.typeOfEncounter,
      breed: report.typeOfShark,
      zone: report.zone,
      formattedReportTime: report.formattedReportTime
    }
  })
  this.setState({
    reports: reportobj
  })
})
}

getStates = () => {
  //Get all the states from the reports array
  const states = this.state.reports.map((report) => {
    return report.state
  })
  // Create an array of unique states
  const stateset = _.uniq(states)
  this.setState({
    states: states,
    stateset: stateset,
  })
}


getBreeds = () => {
  const breeds = this.state.reports.map((report) => {
    return report.breed
  })
  const breedset = _.uniq(breeds);
  this.setState({
    breeds: breeds,
    breedset: breedset,
  })
}

calculateStateCount = () => {
  const statecount = _.countBy(this.state.states);
  this.setState({
    statecount:statecount,
  })
}

calculateBreedCount = () => {
  const breedscount = _.countBy(this.state.breeds);
  this.setState({
    breedscount:breedscount,
  })
}


createBreedObject = () => {
  const newbreedcount = _.map(this.state.breedscount, (key, value) => console.log('breed', value, 'count', key))
  console.log(newbreedcount);
}

createStateObject = () => {
  const newstatecount = _.map(this.state.statecount, (key, value) => console.log('state', value, 'count', key))
  console.log(newstatecount);
}
// Transform my breed count from an array to an object
// _.map({a: 1, b: 2}, (key, value) => console.log('key', key, 'val', value))
//>> VM4881:1 key 1 val a
//>> VM4881:1 key 2 val b


  render() {
    return (
      <div className="App">

        <h2>Country: Australia</h2>
        <h2>Reports recorded since:{this.state.daterangestart}</h2>
        <button onClick={this.getBreeds} type="submit">Breeds</button>
        <button onClick={this.getStates} type="submit">States</button>
        <button onClick={this.calculateStateCount} type="submit">doStateCount</button>
        <button onClick={this.calculateBreedCount} type="submit">doBreedCount</button>
        <button onClick={this.createStateObject} type="submit">createStateObject</button>
        <button onClick={this.createBreedObject} type="submit">createBreedObject</button>


        {this.state.reports.map(report => {
         return (
           <Report
             key={report.id}
             state={report.state}
             zone={report.zone}
             breed={report.breed}
             time={report.formattedReportTime}
           />
               )
             })}
      </div>
    );
  }
}

export default App;
