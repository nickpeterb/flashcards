import React, { Component } from 'react';

export default class EndScreen extends Component{

    handlePlayAgainClick(){
        window.location.reload();
    }
    render(){
    return(
        <div >
            
            <h1 className="display-4" >Score: {this.props.score}</h1>
            <button className="btn btn-primary" onClick={this.handlePlayAgainClick}>Play Again</button>
        </div>
    )}
}