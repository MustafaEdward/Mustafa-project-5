import React, { Component } from 'react';
import "./Joke.scss"
class Joke extends Component {

    getColor() {
        if (this.props.votes >= 15) {
          return "#009432";
        } else if (this.props.votes >= 12) {
          return "#8BC34A";
        } else if (this.props.votes >= 9) {
          return "#CDDC39";
        } else if (this.props.votes >= 6) {
          return "#FFEB3B";
        } else if (this.props.votes >= 3) {
          return "#f78888";
        } else if (this.props.votes >= 0) {
          return "#F79F1F";
        } else {
          return "#EA2027";
        }
      }
      getEmoji() {
        if (this.props.votes >= 15) {
          return "em em-rolling_on_the_floor_laughing";
        } else if (this.props.votes >= 12) {
          return "em em-laughing";
        } else if (this.props.votes >= 9) {
          return "em em-smiley";
        } else if (this.props.votes >= 6) {
          return "em em-slightly_smiling_face";
        } else if (this.props.votes >= 3) {
          return "em em-neutral_face";
        } else if (this.props.votes >= 0) {
          return "em em-confused";
        } else {
          return "em em-angry";
        }
      }

    render() {
        return (
          <div className='Joke'>
            <div className='Joke__buttons' tabindex="0">
              <i className='fas fa-arrow-up' onClick={this.props.upVote} />
              <span className='Joke-votes' style={{ borderColor: this.getColor() }}>
                {this.props.votes}
              </span>
              <i className='fas fa-arrow-down' onClick={this.props.downVote} />
            </div>
            <div className='Joke__text'>{this.props.text}</div>
            <div className='Joke__emoji'>
              <i className={this.getEmoji()} />
            </div>
          </div>
        );
      }


}
 
export default Joke;
