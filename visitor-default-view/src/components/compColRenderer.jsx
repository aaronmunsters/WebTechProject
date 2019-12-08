import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import ComponentRenderer from "./componentRenderer";

class CompColRenderer extends Component {
  state = {};

  render() {
    return (
      <Card style={{ margin: "1%" }}>
        <Card.Body>
          {this.props.ids.map(id => {
            return (
              <Row key={id} style={{ margin: "1%" }}>
                <ComponentRenderer key={id} id={id}></ComponentRenderer>
              </Row>
            );
          })}
        </Card.Body>
      </Card>
    );
  }
}

export default CompColRenderer;
