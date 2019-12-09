import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import ComponentRenderer from "./componentRenderer.jsx";
import ErrorLog from "./errorLog.jsx";

class ContainerRenderer extends Component {
  render() {
    const { style, ids } = this.props.content;
    let ReactComp;
    switch (style) {
      case "horizontal":
        ReactComp = Col;
        break;
      case "vertical":
        ReactComp = Row;
        break;
      default:
        ReactComp = Row;
        break;
    }
    console.log(this.props.parent);
    return (
      <Container>
        <ReactComp>
          {ids.map(id =>
            id !== this.props.parent ? (
              <Col>
                <div key={id}>
                  <ComponentRenderer key={id} id={id} />
                </div>
              </Col>
            ) : (
              <ErrorLog
                key={id}
                main={"Container tried to render self"}
                det={"Component id: " + id}
                severity={2}
              />
            )
          )}
        </ReactComp>
      </Container>
    );
  }
}

export default ContainerRenderer;
