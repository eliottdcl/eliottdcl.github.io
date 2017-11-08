import React, { Component } from 'react';

class Message extends Component{
    constructor(props){
      super(props)

      this.handleThumbsUp = this.handleThumbsUp.bind(this);
      this.handleThumbsDown = this.handleThumbsDown.bind(this);
      this.handleTrash = this.handleTrash.bind(this);
    }

      handleThumbsUp(){
        this.props.onLike(this.props.id)
      }

      handleThumbsDown(){
        this.props.onDislike(this.props.id)
      }

      handleTrash(){
        this.props.onDelete(this.props.id)
      }

  render(){
    return(
      <li>
        {this.props.text} 👋 
        <i class="fa fa-trash pull-right delete" onClick={this.handleTrash}></i>
        <i class="fa fa-thumbs-down pull-right" onClick={this.handleThumbsDown}></i>
        <i class="fa fa-thumbs-up pull-right" onClick={this.handleThumbsUp}></i>
        <div class="pull-right">{this.props.likes}</div>
      </li>
    )
  }
}

export default Message
