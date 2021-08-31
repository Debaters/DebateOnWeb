import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

async function getTitles() {
  const response = await fetch("/graphql", {
    body: `{"query":"{titles}"}`,
    headers: {
      Accept: "application/json",
      "Api-Key": "demoKeyOfApi",
      "Content-Type": "application/json",
      Dnt: "1"
    },
    method: "POST"
  })
  console.log(response.json());
};

getTitles();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
