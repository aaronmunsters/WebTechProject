import React, { Component } from "react";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";

export default class Navigation extends Component {
  render() {
    const {
      destinations,
      destinationIndex: current,
      onAddNewContent
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col xl={10} lg={10} md={9} sm={8} xs={12}>
            <h1>{destinations[current].title}</h1>
          </Col>
          <Col xl={2} lg={2} md={3} sm={4} xs={12}>
            <DropdownButton id="dropdown-basic-button" title="Add Content">
              {destinations.map(function(element) {
                if (element.typeOfData !== "noData") {
                  return (
                    <Dropdown.Item
                      key={element.typeOfData}
                      onClick={() => onAddNewContent(element.typeOfData)}
                    >
                      {element.typeOfData}
                    </Dropdown.Item>
                  );
                } else return null;
              })}
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    );
  }
}
