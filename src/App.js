import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import "./Debate_Room/Debate_Room";
import Debate_Room from "./Debate_Room/Debate_Room";

function App() {
  return (
    <Router>
      <header className='header'>
        <div>
          <Link to='/'>Debaters world</Link>
        </div>
      </header>
      <div className='main'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/routing'>
            <Debate_Room />
          </Route>
        </Switch>
      </div>
      <footer className='footer'></footer>
    </Router>
  );
}

export default App;
