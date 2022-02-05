import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import "./Debate_Room/Debate_Room";
import Debate_Room from "./Debate_Room/Debate_Room_func";
import HomeApollo from "./HomeApollo";

function App() {
  return (
    <Router>
      <header className='header'>
        <Link exact='true' to='/DebateOnWeb'>
          Debaters world
        </Link>
        <Link exact='true' to='/homeApollo'>
          Apollo
        </Link>
      </header>
      <div className='main'>
        <Switch>
          <Route exact path='/DebateOnWeb'>
            <Home />
          </Route>
          <Route exact path='/routing'>
            <Debate_Room />
          </Route>
          <Route exact path='/homeApollo'>
            <HomeApollo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
