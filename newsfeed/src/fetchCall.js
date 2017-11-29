import React, { Component } from 'react';
import Title from './title'

class FetchCall extends Component {
  constructor(props){
    super(props);
    this.state = {
      newsfeed: {}
    };
  }

componentDidMount(){
  fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
.then(results => results.json())
.then(results => {
  this.setState({
    newsfeed: results.data.feed
  })
})
}

  render(){
    console.log(this.state);
    const extraProps = {...this.state, loading: true};
    console.log(extraProps);
    return(
      <div>
        <Title {...this.state.newsfeed}/>
      </div>
    )
  }
}

export default FetchCall;
