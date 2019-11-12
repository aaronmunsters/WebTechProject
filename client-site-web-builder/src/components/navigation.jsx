import React from "react";
import { Navbar, Dropdown, Nav, Button } from "react-bootstrap";

export default function Navigation(props) {
  const renderItem = (destination, index, current) => {
    return (
      <Dropdown.Item
        onSelect={() => props.setDestinationIndex(index)}
        key={index}
        className={index === current ? "active" : "none"}
      >
        {destination.title}
      </Dropdown.Item>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
    >
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/SmallLogo.svg"
          width="40"
          height="30"
          className="d-inline-block align-top"
        />
        WoxPace
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {props.destinations.map((destination, index) =>
            renderItem(destination, index, props.destinationIndex)
          )}
        </Nav>
        <Navbar.Text>
          Welcome, corre{" "}
          <Button inline="true" variant="outline-success">
            Search
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
