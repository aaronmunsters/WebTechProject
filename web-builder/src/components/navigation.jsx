import React from "react";
import { Navbar, Dropdown, Nav, Button } from "react-bootstrap";

export default function Navigation(props) {
  const { setDestinationIndex, destinations, axios } = props;
  const renderItem = (destination, index, current) => {
    return (
      <Dropdown.Item
        onSelect={() => setDestinationIndex(index)}
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
          src="/SmallLogo.ico"
          width="40"
          height="30"
          className="d-inline-block align-top"
        />
        WoxPace
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {destinations.map((destination, index) =>
            renderItem(destination, index, props.destinationIndex)
          )}
        </Nav>
        <Navbar.Text>
          Welcome, {axios.state.user}{" "}
          <Button
            inline="true"
            variant="outline-success"
            onClick={() => {
              axios.logOut();
              setDestinationIndex(0);
            }}
          >
            Log Out
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
