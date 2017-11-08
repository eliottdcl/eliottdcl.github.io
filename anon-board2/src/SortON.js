import React, { Component } from 'react';

class SortON extends Component{
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
        <img class="down-arrow" src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-256.png" />
      </span>
    )
  }

}

export default SortON
