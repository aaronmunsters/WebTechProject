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

  componentDidMount = async () => {
    let userToken = await axios
      .post("http://localhost:3001/v1/login", {
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
    let pages = await axios
      .get("http://localhost:3001/v1/api/page", this.state.axiosConfig)
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    let woxComponents = await axios
      .get("http://localhost:3001/v1/api/woxComponent", this.state.axiosConfig)
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    let users = await axios
      .get("http://localhost:3001/v1/api/user", this.state.axiosConfig)
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    this.setState({
      serverFetched: true,
      page: pages.data,
      woxComponent: woxComponents.data,
      user: users.data
    });
  };

  handleGetObjectFromDatabase = async objectId => {
    let Object = await axios
      .get(
        "http://localhost:3001/v1/api/" +
          this.props.currentPage.typeOfData +
          "/" +
          objectId,
        this.state.axiosConfig
      )
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    this.setState({
      modalShow: "Edit",
      typeOfContent: this.props.currentPage.typeOfData,
      currentObject: Object.data
    });
  };

  handleRemoveObjectFromDatabase = async objectId => {
    await axios
      .delete(
        "http://localhost:3001/v1/api/" +
          this.props.currentPage.typeOfData +
          "/" +
          objectId,
        this.state.axiosConfig
      )
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    this.handleRefreshTable(this.props.currentPage.typeOfData);
  };

  handleEditObjectInDatabase = async (data, id) => {
    await axios
      .put(
        "http://localhost:3001/v1/api/" + this.state.typeOfContent + "/" + id,
        data,
        this.state.axiosConfig
      )
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    console.log(
      data,
      id,
      "http://localhost:3001/v1/api/" + this.state.typeOfContent + "/" + id
    );
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleAddObjectToDatabase = async data => {
    console.log(data);
    await axios
      .post(
        "http://localhost:3001/v1/api/" + this.state.typeOfContent,
        data,
        this.state.axiosConfig
      )
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    this.handleRefreshTable(this.state.typeOfContent);
  };

  handleSubmit = (data, id) => {
    if (this.state.modalShow === "New") this.handleAddObjectToDatabase(data);
    else if (this.state.modalShow === "Edit")
      this.handleEditObjectInDatabase(data, id);
  };

  handleRefreshTable = async dataType => {
    let test = await axios.get(
      "http://localhost:3001/v1/api/" + dataType,
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
    let giveawaycomponentlist = this.state.woxComponent;
    //giveawaycomponentlist.unshift({ value: "", title: "choose.." });
    return (
      <Container style={containerStyle} fluid>
        <NewContentModal
          {...this.props}
          lists={{
            woxComponents: giveawaycomponentlist,
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
