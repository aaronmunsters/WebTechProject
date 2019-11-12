import React, { Component } from "react";
import ContentLayout from "./contentLayout";
import TitleBoard from "./titleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col } from "react-bootstrap";

export default class Page extends Component {
  state = {
    typeOfContent: "User",
    modalShow: false,
    contentTypes: ["Page", "WoxComponent", "User"],
    pages: [
      {
        Title: "Frontpage",
        Author: "Aaron",
        Date: "December 17, 1995 03:24:00",
        Content: "this is a steaming pile of content",
        Published: true
      },
      {
        Title: "Pictures",
        Author: "Wolf",
        Date: "December 17, 1995 03:24:00",
        Published: true
      },
      {
        Title: "Blog",
        Author: "Corneel",
        Date: "December 17, 1995 03:24:00",
        Published: true
      }
    ]
  };

  handleOpenModal = typeOfContent => {
    this.setState({ modalShow: true, typeOfContent: typeOfContent });
  };

  handleSubmit = data => {
    let pagesCopy = this.state.pages;
    console.log(Date(Date.now()).toString());
    data.Date = Date(Date.now());
    pagesCopy.push(data);
    this.setState({ pages: pagesCopy, modalShow: false });
  };

  render() {
    const containerStyle = {
      marginTop: "20px"
    };

    return (
      <Container style={containerStyle} fluid>
        <NewContentModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          typeOfContent={this.state.typeOfContent}
          onSubmit={this.handleSubmit}
          onAddPage={object => this.setState({ pages: (this.pages += object) })}
        />
        <Row>
          <Col>
            <TitleBoard
              {...this.props}
              contentTypes={this.state.contentTypes}
              onAddNewContent={this.handleOpenModal}
            />
          </Col>
        </Row>
        <Row>
          <Col xl={10} lg={8} md={8} sm={8} xs={12}>
            <ContentLayout {...this.props} pages={this.state.pages} />
          </Col>
        </Row>
      </Container>
    );
  }
}
