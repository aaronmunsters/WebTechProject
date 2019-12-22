import React from "react";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { complementColor } from "./generalFunctions";
import "./woxLayout.css";

const FooterRenderer = props => {
  const style = { backgroundColor: complementColor(props.backgroundColor) };
  return (
    <Container fluid={true} className="pageFooter">
      <Card style={style}>
        <Card.Body>
          <h3>{props.footcontent}</h3>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FooterRenderer;
