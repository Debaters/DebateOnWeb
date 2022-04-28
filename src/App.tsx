import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Debate_Room from "./Debate_Room/Debate_Room_func";
import HomeTest from "./components/Home/HomeTest";
import Home from "./components/Home/Home";

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
            {/* <Home /> */}
            <HomeTest />
          </Route>
          <Route exact path='/room'>
            <Debate_Room />
          </Route>
        </Switch>
      </div>
      <footer className='footer'></footer>
    </Router>
  );
}

export default App;
