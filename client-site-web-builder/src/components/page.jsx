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
    axiosConfig: {},
    page: [],
    woxComponent: [],
    user: [],
    layout: ["hardcoded"]
  };

  connectWithDatabase = async (connectType, url, options) => {
    url = "http://localhost:3001/v1/api/" + url;
    let { axiosConfig } = this.state;
    const typeFunction = () => {
      switch (connectType) {
        case "get":
          let Config = {
            params: { filters: options ? options : {} },
            ...axiosConfig
          };
          return axios.get(url, Config);
        case "put":
          return axios.put(url, options, axiosConfig);
        case "post":
          return axios.post(url, options, axiosConfig);
        case "delete":
          return axios.delete(url, axiosConfig);
        default:
          return null;
      }
    };
    let responce = await typeFunction().catch(function(error) {
      // handle error
      console.log(error);
    });
    console.log("--- send options ---", options);
    if (connectType === "post") console.log(options);
    return responce;
  };

  componentDidMount = async () => {
    let userToken = await axios
      .post("http://localhost:3001/v1/api/login", {
        email: "admin@admin.be",
        password: "password"
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    this.setState({
      axiosConfig: { headers: { "auth-token": userToken.data.token } }
    });
    let pages = await this.connectWithDatabase("get", "page", {
      col_filter: ["title", "editor", "published", "date", "id"]
    });
    let woxComponents = await this.connectWithDatabase("get", "woxComponent", {
      col_filter: ["title", "editor", "pages", "date", "id"]
    });
    let users = await this.connectWithDatabase("get", "user", {
      col_filters: ["name", "email", "role", "date", "id"]
    });
    this.setState({
      serverFetched: true,
      page: pages.data,
      woxComponent: woxComponents.data,
      user: users.data
    });
  };

  handleGetObjectFromDatabase = async objectId => {
    let Object = await this.connectWithDatabase(
      "get",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    this.setState({
      modalShow: "Edit",
      typeOfContent: this.props.currentPage.typeOfData,
      currentObject: Object.data
    });
  };

  handleRemoveObjectFromDatabase = async objectId => {
    await this.connectWithDatabase(
      "delete",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    this.handleRefreshTable(this.props.currentPage.typeOfData);
  };

  handleEditObjectInDatabase = async (data, id) => {
    await this.connectWithDatabase(
      "put",
      this.state.typeOfContent + "/" + id,
      data
    );
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleAddObjectToDatabase = async data => {
    await this.connectWithDatabase("post", this.state.typeOfContent, data);
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleSubmit = (data, id) => {
    if (this.state.modalShow === "New") this.handleAddObjectToDatabase(data);
    else if (this.state.modalShow === "Edit")
      this.handleEditObjectInDatabase(data, id);
  };

  handleRefreshTable = async dataType => {
    let test = await this.connectWithDatabase("get", dataType);
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
            layouts: this.state.layout,
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
