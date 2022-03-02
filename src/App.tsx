import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import Debate_Room from "./Debate_Room/Debate_Room_type";

function App() {
  return (
    <Router>
      <header className='header'>
        <div>
          <Link to='/DebateOnWeb'>Debaters world</Link>
        </div>
      </header>
      <div className='main'>
        <Switch>
          <Route exact path='/DebateOnWeb'>
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
