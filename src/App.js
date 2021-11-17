import React, { useState } from "react";
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
          <Link exact='true' to='/DebateOnWeb'>
            Debaters world
          </Link>
        </div>
      </header>
      <div className='main'>
        <Switch>
          <Route exact path='/DebateOnWeb'>
            <Home />
          </Route>
          <Route exact path='/routing' component={Debate_Room}>
          </Route>
        </Switch>
      </div>
      <footer className='footer'></footer>
    </Router>
  );
}

export default App;
