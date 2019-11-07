import React, { Component } from "react";
import ContentLayout from "./ContentLayout";
import TitleBoard from "./TitleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col } from "react-bootstrap";

export default class Page extends Component {
  state = {
    typeOfContent: "Page",
    modalShow: false,
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

  handleOpenModal = typeOfContent => {
    this.setState((state, props) => {
      return {
        modalShow: true,
        typeOfContent: typeOfContent
      };
    });
  };

  render() {
    const containerStyle = {
      marginTop: "20px"
    };

    return (
      <Container style={containerStyle} fluid>
        <NewContentModal
          show={this.state.modalShow}
          onHide={() =>
            this.setState((state, props) => {
              return { modalShow: false };
            })
          }
          typeOfContent={this.state.typeOfContent}
          onAddPage={object =>
            this.setState((state, props) => {
              return { pages: (this.pages += object) };
            })
          }
        />
        <Row>
          <Col>
            <TitleBoard
              {...this.props}
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
