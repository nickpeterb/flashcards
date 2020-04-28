import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './App.css';
import "bootswatch/dist/darkly/bootstrap.min.css"; 
import Flashcards from './components/Flashcards';
import EditCards from './components/EditCards';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Flashcards} />
        <Route path="/edit" component={EditCards} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
}

function NoMatch(){
  return (
    <div style={{marginTop: "10%", textAlign: "center"}}>
      <h1>404: Page Not Found</h1>
    </div>
    
  )
}

export default App;
