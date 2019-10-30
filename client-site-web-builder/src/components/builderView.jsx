import React, { Component } from "react";

import ResultView from "./resultView";
import Elements from "./elements";
import Tools from "./tools";
import Navigation from "./navigation";

import "./builder.css";
/*
<div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div>
*/

class BuilderView extends Component {
  state = {
    webResult: {
      // this is the actual website which is being built
    }
  };

  render() {
    return (
      <div className="container-fluid Main-app">
        <Navigation />
        <div className="row justify-content-center">
          <div className="col-md-10 col-xs-6 result-view">
            <ResultView webResult={this.state.webResult} />
          </div>
          <div className="col-md-2 col-xs-6 tools">
            <Tools />
          </div>
        </div>
        <div className="row">
          <div className="col elements">
            <Elements />
          </div>
        </div>
      </div>
    );
  }
}

export default BuilderView;
