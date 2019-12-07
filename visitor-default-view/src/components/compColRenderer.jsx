import React, { Component } from "react";
import { Card } from "react-bootstrap";
import ComponentRenderer from "./componentRenderer";

class CompColRenderer extends Component {
  state = {};

  render() {
    return (
      <Card>
        <Card.Body>
          {this.props.ids.map(id => {
            return <ComponentRenderer key={id} id={id}></ComponentRenderer>;
          })}
        </Card.Body>
      </Card>
    );
  }
}

export default CompColRenderer;
