import React, { Component } from "react";
import ContentLayout from "./ContentLayout";
import TitleBoard from "./TitleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col } from "react-bootstrap";

export default class Page extends Component {
  state = {
    cells: ["Title", "Author", "Created", "Published", "Content"],
    modalShow: false
  };

  handleOpenModal = typeOfContent => {
    this.setState((state, props) => {
      return {
        modalShow: true,
        cells:
          typeOfContent === "Page"
            ? ["Title", "Author", "Created", "Published", "Content"]
            : "Lama"
            ? ["User"]
            : "WoxComponent"
            ? ["Title", "Author", "Created"]
            : ["Error"]
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
          cells={this.state.cells}
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
            <ContentLayout {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}
