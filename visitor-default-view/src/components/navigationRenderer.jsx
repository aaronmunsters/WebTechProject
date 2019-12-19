import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { getApiObject } from "./generalFunctions";

class NavigationRenderer extends Component {
  state = { brand: null, pages: [] };

  componentDidMount = async () => {
    const { brand, navcontent } = this.props;
    const pages = navcontent.map(page => getApiObject("page", page));
    const invalidIdx = [];
    Promise.all(pages).then(pages => {
      pages = pages
        // filter out invalid pages, which are "", handled as a negative boolean
        .filter((res, idx) => {
          if (!res) invalidIdx.push(idx);
          return !!res;
        });
      this.setState({ brand: brand, pages: pages, invalidPages: invalidIdx });
    });
  };

  render() {
    const home = new URL(document.URL).origin;
    const { brand, pages } = this.state;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {brand ? <Navbar.Brand href={home}>{brand}</Navbar.Brand> : null}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {pages.map(link => (
              // This implies every name must be unique!
              <Nav.Link key={link.title} href={home + "/" + link.url}>
                {link.title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationRenderer;
