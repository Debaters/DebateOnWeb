import React from "react";
import Home from "./Home";
import "./App.css";
function App() {
  return (
    <>
      <header className='header'>
        <div>Debaters world</div>
      </header>
      <div className='main'>
        <Home />
      </div>
      <footer className='footer'></footer>
    </>
  );
}

export default App;
