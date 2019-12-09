import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class NavigationRenderer extends Component {
  state = { brand: null, links: [] };

  componentDidMount = () => {
    const { brand, content } = this.props;
    this.setState({ brand: brand, links: JSON.parse(content) });
  };

  render() {
    const { brand, links } = this.state;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {brand ? <Navbar.Brand href="#home">{brand}</Navbar.Brand> : null}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {Object.keys(links).map(name => (
              // This implies every name must be unique!
              <Nav.Link key={name} href={links[name]}>
                {name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationRenderer;
