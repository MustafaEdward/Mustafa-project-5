import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.scss';
import { jsxAttribute } from '@babel/types';


class JokeList extends Component {
    static defaultProps = {
       numberOfJokes : 7,
    };
   constructor(props){
       super(props);
       this.state = {
           jokes : [],
       }
   }

   async componentDidMount() {
       //load jokes 
       let jokesArray = [];
     while (jokesArray.length < this.props.numberOfJokes) {
        let res=  await axios.get("https://icanhazdadjoke.com/", 
           {headers: {accept: "application/json"}
    });
     jokesArray.push({id:uuid(), text: res.data.joke, votes: 0});
     }
     console.log(jokesArray );

     this.setState({ 
         jokes: jokesArray
         });
   }

   handelVote(id, updateNumber) {
       this.setState(
           prevSate => ({
               jokes: prevSate.jokes.map((singleJoke=>
                singleJoke.id===id ? {...singleJoke, votes: singleJoke.votes + updateNumber}:singleJoke))
           })
       )   
   }
    render() { 
        return ( 
            <div className="JokeList">
                <h1 jokeList-title>Safi style jokes</h1>
                <div className="jokeList-joke">
                 {this.state.jokes.map(j=> 
                 <Joke key={j.id} 
                 votes={j.votes} 
                 text={j.text} 
                 upVote={()=>this.handelVote(j.id, 1)}
                 downVote = {()=> this.handelVote(j.id, -1)}
                 />
                 )}
                </div>
                <h2 JokeList="jokeList-guide">Do you want more of these cheesy jokes?</h2>
                <button className="jokeList-button">get more jokes</button>
            </div>
           );
    }
}
 
export default JokeList;