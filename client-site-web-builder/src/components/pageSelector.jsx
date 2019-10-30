import React, { Component } from "react";

import ResultView from "./resultView";
//import Elements from "./elements";
//import Tools from "./tools";
import Navigation from "./navigation";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./builder.css";

class PageSelector extends Component {
  state = {};
  render() {
    return (
      <Container fluid={true} className="Main-app">
        <Navigation
          regionName="Page selector"
          selections={[
            { key: 1, btnType: "primary", title: "Dashboard" },
            { key: 2, btnType: "primary", title: "pages" },
            { key: 3, btnType: "primary", title: "Posts" },
            { key: 4, btnType: "primary", title: "Users" },
            { key: 5, btnType: "dark", title: "Log out" }
          ]}
        />

        <Navbar expand="lg">
          <h2>Dashboard</h2>
          <ButtonGroup>
            <DropdownButton as={ButtonGroup} title="Add content">
              <Dropdown.Item eventKey="1">First</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="3">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Navbar>

        <Row className="justify-content-center">
          <Col md={3} xs={6} className="result-view">
            <ResultView webResult={this.state.webResult} />
          </Col>
          <Col md={9} xs={6} className="tools">
            <Col>
              <Row>
                <h3>Statistics</h3>
              </Row>
              <Row>
                <Col>
                  <h1>Users</h1>
                </Col>
                <Col>
                  <h1>Pages</h1>
                </Col>
                <Col>
                  <h1>Posts</h1>
                </Col>
                <Col>
                  <h1>Visitsers</h1>
                </Col>
              </Row>
            </Col>
            <Col>
              <h1>Recently updated</h1>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PageSelector;
