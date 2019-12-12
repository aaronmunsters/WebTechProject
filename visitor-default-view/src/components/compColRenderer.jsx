import React from "react";
import { Card, Row } from "react-bootstrap";
import ComponentRenderer from "./componentRenderer";
import { complementColor } from "./generalFunctions";

const CompColRenderer = props => {
  const { followstyle, backgroundColor } = props.style;
  let thisStyle;
  if (followstyle) {
    thisStyle = {
      backgroundColor: complementColor(backgroundColor)
    };
  }
  return (
    <Card style={{ ...thisStyle, padding: "1%" }}>
      <Card.Body>
        {props.ids.map(id => {
          return (
            <Row key={id} style={{ margin: "1%" }}>
              <ComponentRenderer key={id} id={id}></ComponentRenderer>
            </Row>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default CompColRenderer;
