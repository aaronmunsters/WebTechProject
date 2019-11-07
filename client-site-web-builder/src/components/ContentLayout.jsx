import React, { Component } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import ContentTable from "./contentTable";
import LayoutEditor from "./layoutEditor";

class ContentLayout extends Component {
  handleBtnClick = () => {
    let pages = this.props.pages;
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
      content = <ContentTable {...this.props} />;
    }
    return <Container>{content}</Container>;
  }
}

export default ContentLayout;
