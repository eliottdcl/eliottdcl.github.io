import React, { Component } from 'react';

class SortNO extends Component{
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
        <img alt="sortZA" class="up-arrow" src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-128.png" />
      </span>
    )
  }

}

export default SortNO
