import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <Navbar expand="lg">
        <h1>WoxSpace</h1>
        <h4>{this.props.regionName}</h4>
        {this.props.selections.map(s => (
          <Button key={s.key} variant={s.btnType}>
            {s.title}
          </Button>
        ))}
      </Navbar>
    );
  }
}

export default Navigation;
