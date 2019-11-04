import React from "react";
import Index from "./Index";
//import DestinationLayout from "./DestinationLayout";
import ContentLayout from "./ContentLayout";
import TitleBoard from "./TitleBoard";
import { Container, Row, Col } from "react-bootstrap";

export default function Page(props) {
  const containerStyle = {
    marginTop: "70px"
  };

  return (
    <Container style={containerStyle} fluid>
      <Row>
        <Col>
          <TitleBoard {...props} />
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={8} md={8} sm={8} xs={12}>
          <ContentLayout {...props} />
        </Col>
      </Row>
    </Container>
  );
}
