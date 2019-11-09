import React, { Component } from "react";
import Col from "react-bootstrap/Col";

class NavbarEditor extends Component {
  /*
  navbarType = "simple"/...
  // currently only "simple" is supported!
  navbarContent = ["Main", "option", "option", "option"];
  */
  state = {};
  render() {
    const { navbarContent } = this.props;
    const main = navbarContent[0];
    const navbarSelections = navbarContent;
    navbarSelections.shift();
    return (
      <Col>
        <b>{main}</b>
        {navbarSelections.map(option => (
          <h4>{option}</h4>
        ))}
      </Col>
    );
  }
}

export default NavbarEditor;
