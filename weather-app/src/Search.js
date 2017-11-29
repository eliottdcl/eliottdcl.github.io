import React, { Component } from 'react'

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    this.props.onSearch(this.state.value)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return(
      <div>
          <input
            class="search-bar"
            type="text"
            onChange={this.handleChange}
            value={this.state.value}></input>
          <button
            class="search-button"
            onClick={this.handleSearch}
            >Search</button>
      </div>
    )
  }
}



export default Search
