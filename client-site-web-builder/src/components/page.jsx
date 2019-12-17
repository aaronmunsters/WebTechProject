import React, { Component } from "react";
import TitleBoard from "./titleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import ContentTable from "./contentTable";
import LoginModal from "./loginModal";

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

  fetchTables = async () => {
    const { axios } = this.props;
    let pages = await axios.ConnectWithDatabase("get", "page", {
      col_filter: ["title", "editor", "published", "date", "id", "description"]
    });
    let woxComponents = await axios.ConnectWithDatabase("get", "woxComponent", {
      col_filter: ["title", "editor", "pages", "date", "id", "description"]
    });
    let users = await axios.ConnectWithDatabase("get", "user", {
      col_filters: ["name", "email", "role", "date", "id", "description"]
    });
    let layout = await axios.ConnectWithDatabase("get", "layout", {
      col_filters: ["title", "editor", "date", "id", "description"]
    });
    this.setState({
      page: pages.data,
      woxComponent: woxComponents.data,
      user: users.data,
      layout: layout.data
    });
  };

  handleGetObjectFromDatabase = async objectId => {
    const { axios } = this.props;
    let thisObject = await axios.ConnectWithDatabase(
      "get",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    this.setState({
      modalShow: "Edit",
      typeOfContent: this.props.currentPage.typeOfData,
      currentObject: thisObject.data
    });
  };

  handleRemoveObjectFromDatabase = async objectId => {
    const { axios } = this.props;
    await axios.ConnectWithDatabase(
      "delete",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    this.handleRefreshTable(this.props.currentPage.typeOfData);
  };

  handleEditObjectInDatabase = async (data, id, type) => {
    const { axios } = this.props;
    await axios.ConnectWithDatabase(
      "put",
      this.state.typeOfContent + "/" + id,
      data
    );
    this.setState({ modalShow: false });
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleAddObjectToDatabase = async (data, type) => {
    const { axios } = this.props;
    await axios.ConnectWithDatabase("post", this.state.typeOfContent, data);
    this.setState({ modalShow: false });
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleRefreshTable = async dataType => {
    const { axios } = this.props;
    let test = await axios.ConnectWithDatabase("get", dataType);
    this.setState({ [dataType]: test.data });
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
        <LoginModal
          onCorrectCredentials={() => {
            this.setState({ loggedIn: true });
            this.fetchTables();
          }}
          axios={this.props.axios}
        />
        <NewContentModal
          {...this.props}
          lists={{
            woxComponents: this.state.woxComponent,
            layouts: this.state.layout,
            pages: this.state.page
          }}
          show={this.state.modalShow}
          typeOfContent={this.state.typeOfContent}
          currentObject={this.state.currentObject}
          onHide={() => this.setState({ modalShow: false })}
          onAddNewContent={this.handleAddObjectToDatabase}
          onEditContent={this.handleEditObjectInDatabase}
          onGetContent={this.handleGetObjectFromDatabase}
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
