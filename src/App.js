import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import './Debate_Room/Debate_Room';
import Debate_Room from './Debate_Room/Debate_Room';

class App extends Component {
  render() {
    return (
      <div>
        <Debate_Room></Debate_Room>
      </div>
    )

  }
}

export default App;