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
    waitingOnData: false,
    axiosConfig: {},
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

    this.setState({
      axiosConfig: { headers: { "auth-token": userToken.data } }
    });
    let pages = await axios.get(
      "http://localhost:3001/page",
      this.state.axiosConfig
    );
    let woxComponents = await axios.get(
      "http://localhost:3001/woxComponent",
      this.state.axiosConfig
    );
    let users = await axios.get(
      "http://localhost:3001/user",
      this.state.axiosConfig
    );

    this.setState({
      serverFetched: true,
      page: pages.data,
      woxComponent: woxComponents.data,
      user: users.data
    });
  };

  handleGetObjectFromDatabase = async objectId => {
    let Object = await axios.get(
      "http://localhost:3001/" +
        this.props.currentPage.typeOfData +
        "/" +
        objectId,
      this.state.axiosConfig
    );
    this.setState({
      modalShow: "Edit",
      typeOfContent: this.props.currentPage.typeOfData,
      currentObject: Object.data
    });
  };

  handleRemoveObjectFromDatabase = async objectId => {
    await axios.delete(
      "http://localhost:3001/" +
        this.props.currentPage.typeOfData +
        "/" +
        objectId,
      this.state.axiosConfig
    );
    this.handleRefreshTable(this.props.currentPage.typeOfData);
  };

  handleEditObjectInDatabase = async data => {
    await axios.put(
      "http://localhost:3001/" + this.state.typeOfContent + "/" + data.id,
      data,
      this.state.axiosConfig
    );
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleAddObjectToDatabase = async data => {
    await axios.post(
      "http://localhost:3001/" + this.state.typeOfContent,
      data,
      this.state.axiosConfig
    );
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleSubmit = data => {
    if (this.state.modalShow === "New") this.handleAddObjectToDatabase(data);
    else if (this.state.modalShow === "Edit")
      this.handleEditObjectInDatabase(data);
  };

  handleRefreshTable = async dataType => {
    let test = await axios.get(
      "http://localhost:3001/" + dataType,
      this.state.axiosConfig
    );
    this.setState({ [dataType]: test.data, modalShow: false });
  };

  handleOpenNewModal = typeOfContent => {
    this.setState({
      modalShow: "New",
      typeOfContent: typeOfContent
    });
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
          lists={{
            woxComponents: this.state.woxComponent,
            pages: this.state.page
          }}
          show={this.state.modalShow}
          typeOfContent={this.state.typeOfContent}
          currentObject={this.state.currentObject}
          onHide={() => this.setState({ modalShow: false })}
          onSubmit={this.handleSubmit}
        />
        <Row>
          <Col>
            <TitleBoard
              {...this.props}
              onAddNewContent={this.handleOpenNewModal}
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
                onRemoveContent={this.handleRemoveObjectFromDatabase}
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
