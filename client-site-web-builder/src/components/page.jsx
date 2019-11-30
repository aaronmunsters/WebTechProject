import React, { Component } from "react";
import TitleBoard from "./titleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import ContentTable from "./contentTable";
import axios from "axios";

export default class Page extends Component {
  state = {
    typeOfContent: "woxComponent",
    currentObject: {},
    modalShow: false,
    page: [],
    woxComponent: [],
    user: [],
    layout: []
  };

  componentDidMount = async () => {
    let userToken = await axios.post("http://localhost:3001/login", {
      email: "admin@admin.be",
      password: "password"
    });
    let pages = await axios.get("http://localhost:3001/page", {
      headers: { "auth-token": userToken.data }
    });
    let woxcomponents = await axios.get("http://localhost:3001/component", {
      headers: { "auth-token": userToken.data }
    });
    let users = await axios.get("http://localhost:3001/user", {
      headers: { "auth-token": userToken.data }
    });

    this.setState({
      serverFetched: true,
      page: pages.data,
      woxComponent: woxcomponents.data,
      user: users.data,
      userToken: userToken.data
    });
  };

  handleGetObjectFromDatabase = async objectId => {
    let test = await axios.get(
      "http://localhost:3001/" +
        this.props.currentPage.typeOfData +
        "/" +
        objectId,
      {
        headers: { "auth-token": this.state.userToken }
      }
    );
    console.log(test.data);
  };

  handleOpenModal = typeOfContent => {
    this.setState({ modalShow: true, typeOfContent: typeOfContent });
  };

  handleSubmit = data => {
    let dataCopy = this.state[this.state.typeOfContent];
    dataCopy.push(data);
    console.log(data);
    this.setState({ [this.state.typeOfContent]: dataCopy, modalShow: false });
  };

  render() {
    const containerStyle = {
      marginTop: "20px"
    };

    const { currentPage } = this.props;

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
            {currentPage.title === "Dashboard" ? (
              <Jumbotron>
                <h2>Dashboard</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Recusandae possimus alias fuga culpa libero illum, consequatur
                  facere magnam sapiente ratione ipsam, ea eos necessitatibus
                  earum error enim temporibus, ipsum sunt.
                </p>
              </Jumbotron>
            ) : (
              <ContentTable
                {...this.props}
                onGetContent={this.handleGetObjectFromDatabase}
                list={this.state[currentPage.typeOfData]}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
