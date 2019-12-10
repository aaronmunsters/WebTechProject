import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import ComponentRenderer from "./componentRenderer";

const CompColRenderer = props => {
  const rbgString = rgb => "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  let colorShift;
  const colorArr = props.style.backgroundColor
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map(n => parseInt(n));
  const complFactor = 80;

  colorShift =
    colorArr.reduce((a, n) => a + n) / 3 > 125 ? -complFactor : +complFactor;
  const complColorArr = colorArr.map(n => n + colorShift);
  console.log("The better color for ", colorArr, "is", complColorArr);
  const thisStyle = { backgroundColor: rbgString(complColorArr) };
  return (
    <Card style={{ ...thisStyle, margin: "1%" }}>
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
