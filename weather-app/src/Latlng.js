import React, { Component } from 'react'

class Latlng extends Component {
  constructor(props){
    super(props)
  }
  render() {
    if (this.props.loadingLatlng) {
      return <div>Loading...</div>
    }
    if (!this.props.loadingLatlng && this.props.hasLatlng) {
      return(
        <div>
          <div>Location: {this.props.location}</div>
          <div>Lattitude: {this.props.lat}</div>
          <div>Longitude: {this.props.lng}</div>
        </div>
      )
    }
    return  <div>Select a city...</div>
  }
}



export default Latlng
