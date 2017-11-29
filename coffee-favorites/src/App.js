import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import Cafe from './Cafe'

class App extends Component {
  constructor(props){
    super(props);

    const config = {
      apiKey: "AIzaSyAdxsjVL4OIHaBLpR-_gpprmylzmdtfG-s",
      authDomain: "coffee-favorites-7385e.firebaseapp.com",
      databaseURL: "https://coffee-favorites-7385e.firebaseio.com",
      projectId: "coffee-favorites-7385e",
      storageBucket: "coffee-favorites-7385e.appspot.com",
      messagingSenderId: "957791881981"
      };

      firebase.initializeApp(config);


    this.addNewCafe = this.addNewCafe.bind(this);
  }

state = {
  cafes: []
}


addNewCafe(event){
  event.preventDefault();
  const newCafes = this.state.cafes;
  const newCafe = {
    name: this.nameInput.value,
    address: this.addressInput.value,
    rating: parseInt(this.ratingInput.value),
  }
  newCafes.push(newCafe)

  this.setState({
    cafes: newCafes
  })

  firebase.database().ref('cafes/' + newCafe.name).set(newCafe)
}

componentDidMount(){
  firebase.database().ref('cafes/').on('value',(snapshot) => {
    const cafes = snapshot.val()
    this.setState({
      cafes: Object.keys(cafes).map(cafeId => {
        return cafes[cafeId];
      }),
    })
  })
}

  render() {
    return (
      <div className="App">
        <h1>My favorite places for coffee</h1>
        <h2>Add a cafe to the list</h2>
        <form>
          <label>Name</label>
          <input type="text" ref={ref => this.nameInput = ref} />
          <label>Address</label>
          <input type="text" ref={ref => this.addressInput = ref} />
          <label>Rating</label>
          <input type="number" ref={ref => this.ratingInput = ref} />
          <button type="submit" onClick={this.addNewCafe}>Add your cafe</button>
        </form>
        <h2>Favorites:</h2>
          {this.state.cafes.map(cafe => (
          <Cafe name={cafe.name} address={cafe.address} rating={cafe.rating} key={cafe.name}/>
        ))}
      </div>
    );
  }
}

export default App;
