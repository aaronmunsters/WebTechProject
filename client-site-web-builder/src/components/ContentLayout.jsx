import React, { Component } from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import ContentTable from "./contentTable";
import LayoutEditor from "./layoutEditor";

class ContentLayout extends Component {
  state = {
    pages: [
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
    ]
  };

  handleLayoutViewClick = () => {
    this.setState({ inLayoutEditor: !this.state.inLayoutEditor });
  };

  handleBtnClick = () => {
    let pages = this.state.pages;
    pages[0].Author = "aaron";
    this.setState({ pages: pages });
  };

  render() {
    const { destinationIndex } = this.props;
    let content;
    if (destinationIndex === 4) {
      content = <LayoutEditor />;
    } else if (destinationIndex === 0) {
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
      content = (
        <ContentTable
          destinationIndex={destinationIndex}
          pages={this.state.pages}
        />
      );
    }
    return (
      <Container>
        {content}
        <Button onClick={this.handleBtnClick}>Test</Button>
      </Container>
    );
  }
}

export default ContentLayout;
