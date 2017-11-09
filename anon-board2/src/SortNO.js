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
        <button type="button">Order by date</button>
      </span>
    )
  }

}

export default SortNO
