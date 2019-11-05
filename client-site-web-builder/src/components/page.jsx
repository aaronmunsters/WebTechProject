import React from "react";
import ContentLayout from "./ContentLayout";
import TitleBoard from "./TitleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col } from "react-bootstrap";

export default function Page(props) {
  const [modalShow, setModalShow] = React.useState(false);
  let cells = ["Title", "Author", "Created", "Published", "Content"];
  const containerStyle = {
    marginTop: "20px"
  };

  return (
    <Container style={containerStyle} fluid>
      <NewContentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        cells={cells}
      />
      <Row>
        <Col>
          <TitleBoard {...props} />
          {/*<button onClick={() => setModalShow(true)}>Test</button>*/}
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
