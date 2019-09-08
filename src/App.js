import React, { Component } from 'react';
import './App.scss';
import JokeList from './JokeList';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="App">
        <JokeList/>
      </div>
     );
  }
}
 
export default App;
