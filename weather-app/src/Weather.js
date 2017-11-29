import React, { Component } from 'react'

class Weather extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <div>
            <div className="weather-time">10:45</div>
            <div className="weather-date">{this.props.date}</div>
          <div className="weather">
              <span className="weather-temp">{this.props.temperature}°</span>
                <span className="weather-clouds">{this.props.clouds}</span>


              <div className="weather-wind">{this.props.wind} km/h</div>
          </div>
      </div>
    )
  }
}



export default Weather
