import React from "react";
import { Card, Row } from "react-bootstrap";
import ComponentRenderer from "./componentRenderer";

const CompColRenderer = props => {
  return (
    <Card style={props.style}>
      <Card.Body {...props}>
        {props.ids.map(id => {
          return (
            <Row key={id}>
              <ComponentRenderer key={id} id={id} />
            </Row>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default CompColRenderer;
