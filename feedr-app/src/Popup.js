import React, { Component } from 'react';

class Popup extends Component {
  constructor(props) {
    super(props);
console.log(this.props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClosePopUp(this.props.id)
  }

  render() {
     console.log(this.props.showPopup);
     console.log(this.props.title);
      if (this.props.showPopup) {
        return (
          <div className="popUp">
            <a href="#"
              className="closePopUp"
              onClick={this.handleClick}
              >X</a>
            <div className="container">
              <h1>{this.props.title}Article title here</h1>
              <p>
                Article description/content here.
              </p>
              <a href="http://localhost:3000/" className="popUpAction" //target="_blank"
              >Read more from source</a>
            </div>
          </div>
              )
      } else {
        return null
      }
  }
}

export default Popup;
