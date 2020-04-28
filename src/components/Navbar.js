import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand">
            <img src={process.env.PUBLIC_URL + '/navIcon.svg'} width="40" height="40" className="d-inline-block align-top" alt="noimage" style={{marginRight:"1rem"}} />
            <Link to="/" className="navbar-brand">Flashcards</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/edit" className="nav-link">Edit Cards</Link>
                  </li>
                </ul>
            </div>
        </nav>
    )
}