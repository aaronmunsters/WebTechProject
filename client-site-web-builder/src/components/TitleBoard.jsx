import React from "react";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";

export default function Navigation(props) {
  const { destinations, destinationIndex: current } = props;
  return (
    <Container fluid>
      <Row>
        <Col xl={10} lg={8} md={8} sm={8} xs={12}>
          <h1>{destinations[current].title}</h1>
        </Col>
        <Col xl={2} lg={4} md={4} sm={4} xs={12}>
          <DropdownButton id="dropdown-basic-button" title="Add Content">
            <Dropdown.Item
              onClick={() => {
                console.log("Clocked");
              }}
            >
              Page
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Post</Dropdown.Item>
            <Dropdown.Item href="#/action-3">User</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
}
