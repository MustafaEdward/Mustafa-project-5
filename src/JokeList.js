import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.scss';
import './underline';



class JokeList extends Component {
    static defaultProps = {
       numberOfJokes : 10,
    };
   constructor(props){
       super(props);
       this.state = {
           //load 7 jokes from localStage and if nothing there ,set to an empty array.
           jokes : JSON.parse(window.localStorage.getItem("jokes")||"[]"), // JSON.parse in order to get the data from localStorage 
           loading: false,                                                             //which is a string and turn in into an object.
       }
       this.handleClick= this.handleClick.bind(this);
   }

   componentDidMount() {
      if(this.state.jokes.length=== 0) this.getJokes();
   }

  
   async getJokes() {
    let jokesArray = [];
     //load jokes 
    while (jokesArray.length < this.props.numberOfJokes) {
       let res=  await axios.get("https://icanhazdadjoke.com/", 
          {headers: {accept: "application/json"}
   });
    jokesArray.push({id:uuid(), text: res.data.joke, votes: 0});
    }
    console.log(jokesArray );

    this.setState(currSt=> ({
        loading:false,
        jokes: [...currSt.jokes , ...jokesArray]
    }),
    ()=> window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) // update votes in localStorage 
    //stringify because it only accpets a string
       
    );
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
       //this.getJokes();
   }
    render() { 
        if(this.state.loading) {
            return(
                <div className="loading">
                   <i className="far fa-8x fa-laugh fa-spin"/>
                   <h1 jokeList-title>...Loading</h1>
                </div>
            )
        }
        return ( 
            <div className="JokeList">
                <h1 className="JokeList__title">Safi style <span className="underline--magical">jokes</span></h1>
                <div className="JokeList__Joke">
                 {this.state.jokes.map(j=> 
                 <Joke key={j.id} 
                 votes={j.votes} 
                 text={j.text} 
                 upVote={()=>this.handelVote(j.id, 1)}
                 downVote = {()=> this.handelVote(j.id, -1)}
                 />
                 )}
                </div>
                <div className="JokeList__info">
                 <h2 className="JokeList__heading">Want more cheesy jokes?</h2>
                 <button className="JokeList__btn" onClick={this.handleClick}>get more jokes</button>
                </div>
            </div>
           );
    }
}
 
export default JokeList;