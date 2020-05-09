import React, { Component } from 'react';
import EndScreen from './EndScreen.js';
import axios from 'axios';

const checkIcon = <svg className="bi bi-check" width="1.7em" height="1.7em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd"/>
</svg>;

const nextIcon = <svg className="bi bi-arrow-right" width="1.7em" height="1.7em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clipRule="evenodd"/>
<path fillRule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clipRule="evenodd"/>
</svg>;

function Card(props){
    return (
      <div>
          <div className={`card mb-3 bg-${props.bgColor}`}  style={{ marginTop: "10%"}}>
              <div className="card-header"> Score: {props.score} </div>
              <div className="card-body">
                  <h1 className="card-title"> {props.currSide ? props.side2 : props.side1} </h1>
                  <p style={{margin: "0"}}>Difficulty: {props.level}</p>
              </div>
          </div>
      </div>
    )
}
  
export default class Flashcards extends Component {
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
        currSide: false, //false = side1, true = side2
        bgColor: "info",

        //endScreen visibility
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
                //update score, penilize for each round
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
      form.reset();
      form.ansInput.disabled = false;
    }
    
    render(){
      return (
        <div>
      
        <div className="mx-auto" style={{width: "19rem", marginTop: "10%", textAlign: "center"}}>
               
            <h2>French</h2>
            
            { !this.state.endScreen ? 
            <div>
             
            <Card 
                score = {this.state.score} 
                bgColor = {this.state.bgColor} 
                currSide = {this.state.currSide} 
                side1 = {this.state.cards?.[this.state.currCard].side1} 
                side2 = {this.state.cards?.[this.state.currCard].side2} 
                level = {this.state.cards?.[this.state.currCard].level} 
            /> 
            
            <form id="check-form">
            <div className="container">
            <div className="row no-gutters">
            
                <div className="col-9">
                    <label style={{float: "left"}}><input type="text" className="form-control form-control-lg" id="ansInput" onChange={this.handleInputChange} /></label> 
                </div>
                
                <div className="col"> 
                { this.state.checked ? 
                    <button onClick={this.handleNextClick} className="btn btn-primary btn-lg" name="nextBtn" style={{float:"right", padding:"0.3em 0.7em"}}>{nextIcon}</button> 
                :
                    <button onClick={this.handleCheckClick} className="btn btn-primary btn-lg" name="checkBtn" style={{float:"right", padding:"0.3em 0.7em"}}>{checkIcon}</button> 
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
        </div>
    )}
}
