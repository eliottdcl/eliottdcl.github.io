import React, { Component } from 'react'

class SortZA extends Component{
  constructor(props){
    super(props)

      this.handleSort = this.handleSort.bind(this);

  }
  handleSort(){
    this.props.onSort()
  }

  render(){
    return(
      <span
        onClick={this.handleSort}>
        {/* <button type="button">High to low</button> */}
        <img class="up-arrow" src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-128.png" />
      </span>
    )
  }
}

export default SortZA
