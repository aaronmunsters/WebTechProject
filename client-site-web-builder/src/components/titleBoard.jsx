import React, { Component } from "react";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";

export default class Navigation extends Component {
  render() {
    const {
      destinations,
      destinationIndex: current,
      onAddNewContent,
      contentTypes
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col xl={10} lg={8} md={8} sm={8} xs={12}>
            <h1>{destinations[current].title}</h1>
          </Col>
          <Col xl={2} lg={4} md={4} sm={4} xs={12}>
            <DropdownButton id="dropdown-basic-button" title="Add Content">
              {contentTypes.map(element => (
                <Dropdown.Item
                  key={element}
                  onClick={() => onAddNewContent(element)}
                >
                  {element}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    );
  }
}
