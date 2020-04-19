import React, { Component } from 'react';
import EndScreen from './EndScreen.js';
import axios from 'axios';

function Card(props){
      return (
        <div>
            <div className={"card mb-3 bg-" + props.bgColor}  style={{ marginTop: "10%"}}>
                <div className="card-header"> Score: {props.score} </div>
                <div className="card-body">
                    <h1 className="card-title"> {props.currSide ? props.side2 : props.side1} </h1>
                    <p style={{margin: "0"}}>Difficulty: {props.level}</p>
                </div>
            </div>
        </div>
      )
  }
  
export default class CardsComponent extends Component {
    constructor(props) {
    super(props)
    this.state = {
        // Deck of flashcards, to be imported from db
        cards: [{}],

        //initialize data members
        score: 0,
        currCard: 0, //INDEX of current card on display
        round: 1,

        //keep track of card changes
        input: "",
        checked: false,
        currSide: false,
        bgColor: "info",

        //keep track of views
        endScreen: false
    }
    this.wrongAns = [];
  }

  componentDidMount = () => {
      axios.get('http://localhost:5000/cards/')
        .then(response => {
          this.setState({
              cards: response.data
          })
        })
        .catch((error) => {
          console.log(error);
      })
  }

  handleInputChange = event => {
      this.setState({input: event.target.value});
  }

  handleCheckClick = event =>{
      event.preventDefault();

      //check answer (input against side2)
      if(this.state.input === this.state.cards[this.state.currCard].side2){
          this.setState({
              //update score
              score: this.state.score + this.state.cards[this.state.currCard].level / this.state.round,
              //update bgColor
              bgColor: "success"
          });
          
      } else {
          this.setState({ 
              //update text color
              bgColor: "danger",
          })
          //update array of wrong answers
          this.wrongAns.push(this.state.cards[this.state.currCard]);
      }
      this.setState({
          //mark answer checked
          checked: true,

          //update current side
          currSide: !this.state.currSide
      });
      //clear input box and disable it
      var form = document.getElementById("check-form");
      form.reset();
      form.ansInput.disabled = true;
  }
  
  handleNextClick = event => {
      event.preventDefault();

      var nextCard;
      //if the last card has not been reached
      if(this.state.currCard + 1 < this.state.cards.length){
          nextCard = this.state.currCard + 1;
      } else {
          if(this.wrongAns.length > 0){
              this.setState({ 
                  //make wrongAns the new cards
                  cards: this.wrongAns,

                  //update round
                  round: this.state.round + 1
              });

              //reset wrongAns
              this.wrongAns = [];
          } else {
              //display endScreen
              this.setState({ endScreen: true });
              //could be changed to react router
          }
          nextCard = 0;
      }
      
      this.setState({
          //update current Card
          currCard: nextCard,

          //reset answer checked
          checked: false,

          //reset currSide
          currSide: !this.state.currSide,

          //reset bgColor
          bgColor: "info"
      });

      //enable input box
      var form = document.getElementById("check-form");
      form.ansInput.disabled = false;
  }
  
  render(){
      return (
      
        <div className="mx-auto" style={{width: "19rem", marginTop: "10%", textAlign: "center"}}>
               
            <h1>Flashcards!</h1>
            
            { !this.state.endScreen ? 
            <div>
            
            <Card score={this.state.score} bgColor={this.state.bgColor} currSide={this.state.currSide} side1={this.state.cards[this.state.currCard].side1} side2={this.state.cards[this.state.currCard].side2} level={this.state.cards[this.state.currCard].level}/> 
            
            <form id="check-form">
            <div className="container">
            <div className="row no-gutters">
            
                <div className="col-8" sytle={{padding: "5"}}>
                    <label style={{float: "left"}}><input type="text" className="form-control form-control-lg" id="ansInput" onChange={this.handleInputChange} /></label> 
                </div>
                
                <div className="col">
                { 
                this.state.checked ? 
                <button onClick={this.handleNextClick} className="btn btn-primary btn-lg" name="nextBtn" style={{float:"right"}}>Next</button> : 
                <button onClick={this.handleCheckClick} className="btn btn-primary btn-lg" name="checkBtn" style={{float:"right"}}>Check</button> 
                }
                </div>
                
            </div>
            </div>
            </form>
            </div>
            : 
            <EndScreen score={this.state.score}/>
            }
        </div>
    )
  }
}
