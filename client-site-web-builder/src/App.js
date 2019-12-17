import React, { Component } from "react";
import Navigation from "./components/navigation";
import Page from "./components/page";
import AxiosConnection from "./components/connectWithDatabase";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setDestinationIndex = this.setDestinationIndex.bind(this);
  }
  state = {
    destinationIndex: 0,
    axios: new AxiosConnection()
  };
  setDestinationIndex(index) {
    this.setState({ destinationIndex: index });
  }
  render() {
    return (
      <React.Fragment>
        <Navigation
          {...this.props}
          axios={this.state.axios}
          destinationIndex={this.state.destinationIndex}
          setDestinationIndex={this.setDestinationIndex}
        />
        <Page
          {...this.props}
          axios={this.state.axios}
          currentPage={this.props.destinations[this.state.destinationIndex]}
        />
      </React.Fragment>
    );
  }
}
