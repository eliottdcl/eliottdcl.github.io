import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Message from './Message'
import Post from './Post'
import SortAZ from './SortAZ'
import SortZA from './SortZA'
import SortON from './SortON'
import SortNO from './SortNO'
import uuid from 'uuid';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [
        { id: uuid.v4(), text: "Hi how are you?", likes: 3,  date:1510129706551},
        { id: uuid.v4(), text: "Good thanks, what are you doing today", likes: 2,  date:1510129706552},
        { id: uuid.v4(), text: "Going surfing", likes: 1,  date:1510129706553},
        { id: uuid.v4(), text: "Nice, I'll come along", likes: 0,  date:1510129706554},
    ]}
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSortingAZ = this.handleSortingAZ.bind(this);
    this.handleSortingZA = this.handleSortingZA.bind(this);
    this.handleSortingON = this.handleSortingON.bind(this);
    this.handleSortingNO = this.handleSortingNO.bind(this);
  }

handleLike(id){
    const message = this.state.messages.find(message =>
      message.id === id
    )
    message.likes = message.likes + 1

    this.setState({
      messages: this.state.messages
    })
}

handleDislike(id){
  const message = this.state.messages.find(message =>
    message.id === id
  )
  message.likes = message.likes - 1

  this.setState({
    messages: this.state.messages
  })
}


handleDelete(id){
    const newMessages = this.state.messages.filter(message =>
      message.id !== id
    )
      this.setState({
        messages: newMessages
      })
}


handlePost(value){
    const newMessage = { id: uuid.v4(), text: value, likes: 0, date: Date.now() }
    const newMessages = this.state.messages.concat([newMessage])
    this.setState({
  messages: newMessages
      })
}

handleSortingAZ(){
  const sortedMessagesAZ = this.state.messages.sort((a,b) =>
  a.likes - b.likes
      )
    this.setState({
      messages: sortedMessagesAZ
    })
}

handleSortingZA(){
  const sortedMessagesZA = this.state.messages.sort((a,b) =>
  b.likes - a.likes
      )
    this.setState({
      messages: sortedMessagesZA
    })
}

handleSortingNO(){
  const sortedMessagesNO = this.state.messages.sort((a,b) =>
  b.date - a.date
)
    this.setState({
      messages: sortedMessagesNO
    })
}

handleSortingON(){
  const sortedMessagesON = this.state.messages.sort((a,b) =>
  a.date - b.date
)
    this.setState({
      messages: sortedMessagesON
    })
}


  render() {
    return (
      <div className="App">
        <Header title={"Mr"} firstName={"Eliott"} />
           <div class="container">
             <div class="panel-group">
               <div class="panel panel-primary">
                 <div class="panel-heading">Post a message</div>
                 <Post
                    value={this.value}
                    onPost={this.handlePost}/>
               </div>
             </div>
             <div class="panel-group">
               <div class="panel panel-default">
                 <div class="panel-heading">Message Board</div>
                 <div class="sort-likes">Likes
                   <SortAZ
                     onSort={this.handleSortingAZ}
                   />
                   <SortZA
                     onSort={this.handleSortingZA}
                   />
                   </div>
                   <div class="sort-date">Date
                   <SortON
                     onSort={this.handleSortingON}
                   />
                   <SortNO
                     onSort={this.handleSortingNO}
                   />
                </div>
                 <div class="panel-body">
                   <ul class="message-board">
                     {this.state.messages.map(message => {
                       return (
                             <Message
                               text={message.text}
                               likes={message.likes}
                               id={message.id}
                               onLike={this.handleLike}
                               onDislike={this.handleDislike}
                               onDelete={this.handleDelete}
                             />
                           )}
                     )}
                   </ul>
                 </div>
               </div>
             </div>
           </div>
      </div>
    );
  }
}

export default App;
