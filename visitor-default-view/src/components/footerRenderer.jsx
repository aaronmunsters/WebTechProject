import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";

class FooterRenderer extends Component {
  state = {};
  render() {
    return (
      <Container fluid={true} style={{ position: "absolute", bottom: 0 }}>
        <Card>
          <Card.Body>
            <h3>{this.props.content}</h3>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default FooterRenderer;
