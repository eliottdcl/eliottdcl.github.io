import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Report from './Report'

class App extends Component {
      constructor(props){
        super(props)
        this.state={
          reports: [],
          breeds: [],
          dataloaded: false,
          stateslist: []
        }

        this.getReports = this.getReports.bind(this);
        this.getCountries = this.getCountries.bind(this);
        this.getStateCount = this.getStateCount.bind(this);
        this.getStates = this.getStates.bind(this);
      }
getReports(){
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
    pageSize: 300,
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
      specie: report.typeOfShark,
      zone: report.zone,
      formattedReportTime: report.formattedReportTime
    }
  })

  this.setState({
    // reports: payload.responseData,
    reports: reportobj
  })
})
}

getCountries(){
  return fetch('https://www.dorsalwatch.com/api/public/countries?_=1512375198838')
  .then(response => response.json())
  .then(payload => {
    const countries = payload.responseData.map(country => {
      return {
              key: country.id,
              name: country.name

      }
    })
    this.setState({
      countries: countries,
    })
  })
}

getStates(){
  return fetch('https://www.dorsalwatch.com/api/public/Australia/states?_=1512375198840')
  .then(response => response.json())
  .then(payload => {
    const states = payload.responseData.map(state => {
      return {
              key: state.id,
              statename: state.name

      }
    })
    this.setState({
      stateslist: states,
    })
  })
}

getStateCount(){
  const countNSW = this.state.reports.filter((report) => {
      return report.state === "NSW"
      })
console.log(countNSW.length);

const countWA = this.state.reports.filter((report) => {
    return report.state === "WA"
    })
console.log(countWA.length);
const daterangestart = this.state.reports.slice(-1)[0]
console.log();
this.setState({
  daterangestart: daterangestart.formattedReportTime,
  countNSW: countNSW.length,
  countWA: countWA.length
})
}


  render() {
    return (
      <div className="App">

        <h2>Country: Australia</h2>
        <h2>Reports recorded since:{this.state.daterangestart}</h2>
        <p>NSW: {this.state.countNSW}</p>
        <p>WA: {this.state.countWA}</p>
        <select name="states">
          {this.state.stateslist.map(state => {
           return (
             <option>{state.statename}</option>
           )})}
        </select>

        <button onClick={this.getReports} type="submit">Get the reports</button>
        <button onClick={this.getCountries} type="submit">getCountries</button>
        <button onClick={this.getStates} type="submit">getStates</button>
        <button onClick={this.getStateCount} type="submit">getStateCountNSW</button>

        {this.state.reports.map(report => {
         return (
           <Report
             key={report.id}
             state={report.state}
             zone={report.zone}
             breed={report.typeOfShark}
             time={report.formattedReportTime}
           />
               )
             })}

        <div className="reports">
          <Report />
        </div>
      </div>
    );
  }
}

export default App;
