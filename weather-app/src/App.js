import React, { Component } from 'react';
import './App.css';
import Weather from './Weather'
import Latlng from './Latlng'
import Search from './Search'


class App extends Component {
  constructor(props) {
    super(props)
    this.state =
      loadingLatlng: false,
      hasLatlng: false,
      latlng: {},//this is
      loadingWeather: false,
      hasWeather: false,
      kelvinFactor: 275.15,
      location:'Sydney',
      date: (new Date()).toString().split(' ').splice(1,3).join(' '),
      timestamp: Math.round(Date.now()/1000)

    }
    this.getLatlng = this.getLatlng.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  handleSearchClick(value) {
    const newLocation = value
    console.log(newLocation);
    this.getLatlng(newLocation)
      .then(result => this.getWeather(result))
      .then(result => this.getTime(result))
  }

  getLatlng(location) {
    console.log(location);
    this.setState({
      loadingLatlng: true,
      location: location
    })
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`) //This searches with empty string
    // return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.location}`) //This searches with null
    // return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Sydney`)
    .then(response => response.json())
    .then(data => {//data represents what you get back, its not a keyword
      if (data.status !== 'OK') {
        this.setState ({
          loadingLatlng: false,
          hasLatlng: false
        })
          throw new Error('Error did not get lat long')
      } else {
        this.setState ({
          latlng: data.results[0].geometry.location,
          location: data.results[0].formatted_address,
          loadingLatlng: false,
          hasLatlng: true
        })
        return data.results[0].geometry.location
      }

    })
  }



  getWeather(lat,lng) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latlng.lat}&lon=${this.state.latlng.lng}&APPID=72af66db614bf9fd03583352142dd7a7`)
    .then(response => response.json())
    .then( data => {
      if (data.main.temp !== 0) {
        this.setState ({
          loadingWeather: false,
          hasWeather: true,
          temperature: Math.round(data.main.temp-273.15),
          windSpeed: Math.round(data.wind.speed*1.852),
          clouds: data.weather[0].description
        })
      } else {
        this.setState({
          loadingWeather: false,
          hasWeather: false
        })
      }
    })
  }



  getTime(lat,lng) {
    return fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.latlng.lat},${this.state.latlng.lng}&timestamp=${this.state.timestamp}`)
    .then(response => response.json())
    .then( data => {
      console.log(data);
    })
  }

  // componentDidMount() {
  //   this.getLatlng('Sydney')
  //   .then(result => this.getWeather(result))
  //   .then(result => this.getTime(result))
  // }



  render() {
    return (
      <div className="App">

           <Weather
             date={this.state.date}
             temperature={this.state.temperature}
             wind={this.state.windSpeed}
             clouds={this.state.clouds}
            />

            <Search
              onSearch={this.handleSearchClick}
             />

          <Latlng
            loadingLatlng={this.state.loadingLatlng}
            hasLatlng={this.state.hasLatlng}
            lat={this.state.latlng.lat}
            lng={this.state.latlng.lng}
            location={this.state.location}
           />
           <div>-------</div>

      </div>
    );
  }
}

export default App;
