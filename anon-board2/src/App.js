import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Message from './Message'
import Post from './Post'
import SortAZ from './SortAZ'
// import SortZA from './SortZA'
// import SortON from './SortON'
import SortNO from './SortNO'
import Search from './Search'
import uuid from 'uuid';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [
        { id: uuid.v4(), text: "Hi how are you?", likes: 3,  date:"Wed Nov 08 2017 08:00:00 GMT+1100 (AEDT)", dateunix: 1510197583152},
        { id: uuid.v4(), text: "Good thanks, what are you doing today", likes: 2,  date:"Wed Nov 08 2017 08:10:00 GMT+1100 (AEDT)", dateunix: 1510197583153},
        { id: uuid.v4(), text: "Going surfing", likes: 1,  date:"Wed Nov 08 2017 08:20:00 GMT+1100 (AEDT)", dateunix: 1510197583154},
        { id: uuid.v4(), text: "Nice, I'll come along", likes: 0,  date:"Wed Nov 08 2017 08:30:00 GMT+1100 (AEDT)", dateunix: 1510197583155},
    ]};
    this.state.order = 'default';

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSortingAZ = this.handleSortingAZ.bind(this);
    // this.handleSortingON = this.handleSortingON.bind(this);
    this.handleSortingNO = this.handleSortingNO.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
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
    const newMessage = { id: uuid.v4(), text: value, likes: 0, date: Date(),dateunix: Date.now()}
    const newMessages = this.state.messages.concat([newMessage])
    console.log(value);
    this.setState({
  messages: newMessages
      })
}

// handleSortingAZ(){
//   const sortedMessagesAZ = this.state.messages.sort((a,b) =>
//   a.likes - b.likes
//       )
// console.log(this.state.order);
//     this.setState({
//       messages: sortedMessagesAZ
//     })
// }

handleSortingAZ(){
  if (this.state.order === "default") {
    const sortedMessagesAZ = this.state.messages.sort((a,b) =>
    a.likes - b.likes
        )
  console.log(this.state.order);
      this.setState({
        messages: sortedMessagesAZ
      })
    this.state.order = "a to z"
    console.log(this.state.order);
  } else if (this.state.order === "a to z") {
    const sortedMessagesZA = this.state.messages.sort((a,b) =>
    b.likes - a.likes
        )
      this.setState({
        messages: sortedMessagesZA
      })
    this.state.order = "z to a"
  } else {
    const sortedMessagesAZ = this.state.messages.sort((a,b) =>
    a.likes - b.likes
        )
  console.log(this.state.order);
      this.setState({
        messages: sortedMessagesAZ
      })
    this.state.order = "a to z"
  }
}

handleSortingNO(){
  if (this.state.order === "default") {
    const sortedMessagesNO = this.state.messages.sort((a,b) =>
    b.dateunix - a.dateunix
  )
      this.setState({
        messages: sortedMessagesNO
      })
      this.state.order = "new to old"
  } else if (this.state.order === "new to old") {
    const sortedMessagesON = this.state.messages.sort((a,b) =>
    a.dateunix - b.dateunix
  )
      this.setState({
        messages: sortedMessagesON
      })
      this.state.order = "old to new"
  } else {
    const sortedMessagesNO = this.state.messages.sort((a,b) =>
    b.dateunix - a.dateunix
  )
      this.setState({
        messages: sortedMessagesNO
      })
      this.state.order = "new to old"
  }
}


// handleSortingNO(){
//   const sortedMessagesNO = this.state.messages.sort((a,b) =>
//   b.dateunix - a.dateunix
// )
//     this.setState({
//       messages: sortedMessagesNO
//     })
// }

// handleSortingON(){
//   const sortedMessagesON = this.state.messages.sort((a,b) =>
//   a.dateunix - b.dateunix
// )
//     this.setState({
//       messages: sortedMessagesON
//     })
// }

handleSearchClick(value){
  const filteredMessages = this.state.messages.filter((message) =>
     message.text.indexOf(value) !== -1
  );
  this.setState({
    messages: filteredMessages
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
                 <Search
                   onSearch={this.handleSearchClick}
                 />
                 <div class="panel-heading">Message Board</div>
                 <div class="sort-likes">
                   <SortAZ
                     onSort={this.handleSortingAZ}
                   />
                   {/* <SortZA
                     onSort={this.handleSortingZA}
                   /> */}
                   </div>
                   <div class="sort-date">
                   {/* <SortON
                     onSort={this.handleSortingON}
                   /> */}
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
                               date={message.date}
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
