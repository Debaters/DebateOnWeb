import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
function App() {
  //삭제 예정(RoutingTest)
  const RoutingTest = () => {
    return <h2>some components made by casy!</h2>;
  };

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
          <Route exact path='/routing'>
            <RoutingTest />
          </Route>
        </Switch>
      </div>
      <footer className='footer'></footer>
    </Router>
  );
}

export default App;
