import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';// generating a unique ID
import './JokeList.scss';

class JokeList extends Component {
    static defaultProps = {
       numberOfJokes : 10,
    };
   constructor(props){
       super(props);
       this.state = {
           //load 7 jokes from localStage and if nothing there ,set to an empty array.
           jokes : JSON.parse(window.localStorage.getItem("jokes")||"[]"), // JSON.parse in order to get the data from localStorage 
           loading: false,                                                 //which is a string and turn in into an object.
       }
       this.loadedJokes = new Set(this.state.jokes.map(j=>j.text)); // preventing duplicate jokes 
       this.handleClick= this.handleClick.bind(this);
   }

   componentDidMount() {
      if(this.state.jokes.length=== 0) this.getJokes();
   }

   async getJokes() {
    try {
    let jokesArray = [];
     //load jokes 
    while (jokesArray.length < this.props.numberOfJokes) {
       let res=  await axios.get("https://icanhazdadjoke.com/", 
          {headers: {accept: "application/json"}
   });
   let newJokes = res.data.joke;
   if(!this.loadedJokes.has(newJokes)){
    jokesArray.push({id:uuid(), text: newJokes, votes: 0});
   } 
 
    }

    this.setState(currSt=> ({
        loading:false,
        jokes: [...currSt.jokes , ...jokesArray]
    }),
    ()=> window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) // update votes in localStorage 
    //stringify because it only accpets a string 
    );
  } catch(e) {
      alert (`Sorry 😟😟😟 ${e} 😟😟😟` );
      this.setState({
          loading:false,
      })
  }
}
   handelVote(id, updateNumber) {
       this.setState(
           prevSate => ({
               jokes: prevSate.jokes.map((singleJoke=>
                singleJoke.id===id ? {...singleJoke, votes: singleJoke.votes + updateNumber}:singleJoke))
           }),
           ()=> window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) // update votes in localStorage
        );  
   }
   handleClick(){
       this.setState({ loading: true  }, this.getJokes); //passing the function as second parameter so I make sure- 
                                                         //user get the reults after loading
   }


    handleTest(e) {
      if (e.charCode === 13) {
        alert("Enter button clicked " );
      }
    }
    
    render() { 
        if(this.state.loading) {
            return(
                <div className="Loading">
                   <i className="far fa-8x fa-laugh fa-spin"/>
                   <h1 className="Loading__title">...Loading</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a,b)=> b.votes - a.votes); // sorting jokes based on votes 
        return ( 
            <div className="JokeList">
                <h1 className="JokeList__title">Safi style <span className="underline--magical">jokes</span></h1>
                <h3 className="JokeList__vote">Vote by clicking the arrows</h3>
                <div className="JokeList__Joke">
                 {jokes.map(j=> 
                 <Joke key={j.id} 
                 votes={j.votes} 
                 text={j.text} 
                 upVote={()=>this.handelVote(j.id, 1)}
                 downVote = {()=> this.handelVote(j.id, -1)}
                 onPress={this.handleTest}
                 />
                 )}
                </div>
                <div className="JokeList__info">
                 <h2 className="JokeList__heading ">Want more corny <span className="underline--magical">jokes?</span></h2>
                 <button className="JokeList__btn" tabIndex="0" onClick={this.handleClick} onKeyPress={this.handleTest}>get more jokes</button>
                </div>
            </div>
           );
    }
}
 
export default JokeList;