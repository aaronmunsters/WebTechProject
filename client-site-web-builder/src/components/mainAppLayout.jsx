import React, { Component } from "react";

import ResultView from "./resultView";
import Elements from "./elements";
import Tools from "./tools";
import Navigation from "./navigation";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MainApp extends Component {
  state = {};
  render() {
    return (
      <Container fluid={true} className="Main-app">
        <Navigation />
        <Row className="justify-content-center">
          <Col md={10} xs={6} className="result-view">
            <ResultView webResult={this.state.webResult} />
          </Col>
          <Col md={2} xs={6} className="tools">
            <Tools />
          </Col>
        </Row>
        <Row>
          <Row className="elements">
            <Elements />
          </Row>
        </Row>
      </Container>
    );
  }
}

export default MainApp;
