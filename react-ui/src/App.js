import React from 'react';
import './App.css';

//Import the home,game,drink,about components
import {Navigation} from './components/Navigation'
import {Home} from './components/Home'
import {Game} from './components/Game'
import {Drinks} from './components/Drinks'
import {About} from './components/About'

//Import react routing
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    //Set a router block to render different pages based on path
    <BrowserRouter>
      <div className="container">

        <h3 className="m-3 d-flex justify-content-center">
          Cocktail Mastery
        </h3>
        
        <Navigation/>

        <Switch>  
          <Route path='/' component={Home} exact/>
          <Route path='/game' component={Game} exact/>
          <Route path='/drinks' component={Drinks} exact/>
          <Route path='/about' component={About} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
