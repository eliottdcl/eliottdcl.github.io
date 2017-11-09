import React, { Component } from 'react'

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {value: ''};


    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

    handleSearch(){
      this.props.onSearch(this.state.value)
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

  render(){
    let filteredMessages = this.props.messages;
    return(

          <div class="search-section">
            {/* <label class="search-label">Search:</label> */}
            <input
              class="search-bar"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button class="button" id="submit"
              onClick={this.handleSearch}>Search
            </button>
          </div>
    )
  }
}

export default Search
