import React, { Component } from "react";
import TitleBoard from "./titleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import ContentTable from "./contentTable";
import LayoutEditor from "./layoutEditor";
import axios from "axios";

export default class Page extends Component {
  state = {
    typeOfContent: "User",
    modalShow: false,
    Page: [
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
    ],
    WoxComponent: [],
    User: []
  };

  componentDidMount = async () => {
    let pages = await axios.get("http://localhost:3001/page");
    let woxcomponents = await axios.get("http://localhost:3001/component");
    let users = await axios.get("http://localhost:3001/user");
    // /console.log(users);
    this.setState({
      serverFetched: true,
      Page: pages.data,
      WoxComponent: woxcomponents.data,
      User: users.data
    });
  };

  handleOpenModal = typeOfContent => {
    this.setState({ modalShow: true, typeOfContent: typeOfContent });
  };

  handleSubmit = data => {
    let dataCopy = this.state[this.state.typeOfContent];
    data.date = Date(Date.now());
    data.creatorName = "Corneel";
    data.published = true;
    dataCopy.push(data);
    this.setState({ [this.state.typeOfContent]: dataCopy, modalShow: false });
  };

  render() {
    const containerStyle = {
      marginTop: "20px"
    };

    return (
      <Container style={containerStyle} fluid>
        <NewContentModal
          {...this.props}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          typeOfContent={this.state.typeOfContent}
          onSubmit={this.handleSubmit}
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
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            {this.props.destinationIndex === 0 ? (
              <Jumbotron>
                <h2>Dashboard</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Recusandae possimus alias fuga culpa libero illum, consequatur
                  facere magnam sapiente ratione ipsam, ea eos necessitatibus
                  earum error enim temporibus, ipsum sunt.
                </p>
              </Jumbotron>
            ) : this.props.destinationIndex === 4 ? (
              <LayoutEditor />
            ) : (
              <ContentTable
                {...this.props}
                list={
                  this.state[
                    this.props.destinations[this.props.destinationIndex]
                      .typeOfData
                  ]
                }
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
