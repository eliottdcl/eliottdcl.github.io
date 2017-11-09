import React, { Component } from 'react'

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {value: ''}


    this.handlePost = this.handlePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePost(){
    this.props.onPost(this.state.value)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
<div class="panel-body">
  <div class="form-group">
    <label>Message:</label>
    <textarea
      id="message"
      type="text"
      class="form-control"
      onChange={this.handleChange}
      value={this.state.value}>
    </textarea>
  </div>
    <button
      id="submit"
      class="button"
      /*class="btn btn-default"*/
      onClick={this.handlePost}>
      Post to board
    </button>
  </div>
    )
  }
}

export default Post
