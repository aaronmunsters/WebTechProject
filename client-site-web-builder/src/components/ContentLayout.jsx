import React, { Component } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import TestComponent from "./testComponent";

const pages = [
  {
    Title: "Frontpage",
    Author: "Corneel",
    Created: new Date("December 17, 1995 03:24:00"),
    Content: "this is a steaming pile of content",
    Published: true
  },
  {
    Title: "Pictures",
    Author: "Corneel",
    Created: new Date("December 17, 1995 03:24:00"),
    Published: true
  },
  {
    Title: "Blog",
    Author: "Corneel",
    Created: new Date("December 17, 1995 03:24:00"),
    Published: true
  }
];

class ContentLayout extends Component {
  handleBtnClick = () => {
    pages[0].Author = "Aaron";
  };

  render() {
    const { destinationIndex } = this.props;
    let content;

    if (destinationIndex === 0) {
      content = (
        <Jumbotron>
          <h2>Dashboard</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
            possimus alias fuga culpa libero illum, consequatur facere magnam
            sapiente ratione ipsam, ea eos necessitatibus earum error enim
            temporibus, ipsum sunt.
          </p>
        </Jumbotron>
      );
    } else {
      content = <TestComponent destinationIndex={destinationIndex} />;
    }
    return (
      <Container>
        {destinationIndex}
        {content}
      </Container>
    );
  }
}

export default ContentLayout;
