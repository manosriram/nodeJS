import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./Test";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Test />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          Learn React
        </header>
      </div>
    );
  }
}

export default App;
