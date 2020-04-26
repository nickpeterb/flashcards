import React, { Component } from 'react';
import axios from 'axios';

const updateIcon = <svg className="bi bi-arrow-repeat" width="1.7em" height="1.7em" viewBox="0 1 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	<path fillRule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clipRule="evenodd"/>
	<path fillRule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clipRule="evenodd"/>
  </svg>;

const deleteIcon = <svg className="bi bi-trash" width="1.7em" height="1.7em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
<path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd"/>
</svg>;

const addIcon = <svg className="bi bi-plus" width="1.7em" height="1.7em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clipRule="evenodd"/>
<path fillRule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clipRule="evenodd"/>
</svg>;

class EditCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            side1: this.props.card.side1, //probably will be this.props.card.side1
            side2: this.props.card.side2,
            level: this.props.card.level,
        }
    }

    handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	
	handleUpdateClick = event => {
		event.preventDefault();

		const updatedCard = {
			side1: this.state.side1,
			side2: this.state.side2,
			level: this.state.level
		}

		axios.post(`http://localhost:5000/cards/update/${this.props.card._id}`, updatedCard)
          .then(response => {
            console.log(response.data);
          })
          .catch((error) => {
			console.log(error);
		})
		
		//window.location = '/';
	}

	handleDeleteClick = event => {
		event.preventDefault();

		axios.delete(`http://localhost:5000/cards/${this.props.card._id}`)
          .then(response => {
			console.log(response.data);
			
			this.props.updateCards();
          })
          .catch((error) => {
			console.log(error);
        })
	}

	handleAddClick = event => {
		event.preventDefault();

		const newCard = {
			side1: this.state.side1,
			side2: this.state.side2,
			level: this.state.level
		} 

		axios.post("http://localhost:5000/cards/add", newCard)
          .then(response => {
			console.log(response.data);

			this.setState({
				side1: "",
				side2: "",
				level: 1
			});
			
			document.getElementById("edit-card-form").reset(); //doesn't work for some reason
			this.props.updateCards();
          })
          .catch((error) => {
			console.log(error);
		})
	}
	
    render(){
        return ( 
		
			<form id="edit-card-form" className="row" >

			<div className="col-lg">
            	<input type="text" name="side1" className="form-control form-control-lg" defaultValue={this.props.card.side1} onChange={this.handleInputChange} />
			</div>

            <div className="col-lg">
				<input type="text" name="side2" className="form-control form-control-lg" defaultValue={this.props.card.side2} onChange={this.handleInputChange} />
			</div>
			
			<div className="col col-xl-3">
			<div className="row">

			<div className="col">
			<select className="custom-select" style={{ height: "2.8rem", width:"3.4rem", fontSize:"1.3rem"}} name="level" onChange={this.handleInputChange} defaultValue={this.props.card.level}>
				<option value="1">1</option>
      			<option value="2">2</option>
      			<option value="3">3</option>
    		</select>
			</div>

			
			{/* Only render +(add) button if it's an empty card */}
			{ this.props.card.side1 === ""  && this.props.card.side2 === ""  ? 
				<div className="col">
					<button style={{padding:"0.3em 0.4em"}} onClick={this.handleAddClick} className="btn btn-success btn-lg" name="addBtn">{addIcon}</button>
				</div>  
			: 
				<div className="col">
					<button style={{ padding:"0.3em 0.4em"}} onClick={this.handleUpdateClick} className="btn btn-success btn-lg" name="updateBtn">{updateIcon}</button>
				</div>
			}
			{ this.props.card.side1 === ""  && this.props.card.side2 === "" ? null :
				<div className="col">
					<button style={{ padding:"0.3em 0.4em"}} onClick={this.handleDeleteClick} className="btn btn-danger btn-lg" name="deleteBtn">{deleteIcon}</button>
				</div>
			}

			</div>
			</div>
			</form>
		
    )}
}

export default class EditCards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Deck of flashcards, to be imported from db
            cards: []
        }
	}
	
	handleUpdateCards = () => {
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

    componentDidMount = () => {
        this.handleUpdateCards();
    }

    render(){
        return (
		<div className="container" style={{ marginTop: "2%", textAlign: "center"}}>
				
			<h1 style={{padding:"1rem"}}>Edit Cards</h1>

			<ul className="list-group">
				{ this.state.cards.map((card, index) => 
					<li className="list-group-item" key={card?._id}> 
						<h4 style={{float: "left", padding:"0.5rem"}}>{index+1})</h4> 
						<EditCard card={card} updateCards={this.handleUpdateCards}/>
					</li> 
				)}
				<li className="list-group-item">
					<h4 style={{float: "left", padding:"0.5rem"}}> {this.state.cards.length+1}) </h4>
					<EditCard card={{side1:"", side2:"", level:1}} updateCards={this.handleUpdateCards}/>
				</li>
			</ul>
			
        </div>
    )}
}