import React, { Component } from "react";
import TitleBoard from "./titleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col } from "react-bootstrap";
import ContentTable from "./contentTable";
import Dashboard from "./dashboard";

export default class Page extends Component {
  state = {
    typeOfContent: "woxComponent",
    currentObject: {},
    modalShow: false
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
    const { axios, onRefreshTable } = this.props;
    await axios.ConnectWithDatabase(
      "delete",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    onRefreshTable();
  };

  handleEditObjectInDatabase = async (data, id, type) => {
    const { axios, onRefreshTable } = this.props;
    await axios.ConnectWithDatabase(
      "put",
      this.state.typeOfContent + "/" + id,
      data
    );
    this.setState({ modalShow: false });
    onRefreshTable();
  };

  handleAddObjectToDatabase = async (data, type) => {
    const { axios, onRefreshTable } = this.props;
    await axios.ConnectWithDatabase("post", this.state.typeOfContent, data);
    this.setState({ modalShow: false });
    onRefreshTable();
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
    const { currentPage, tableData } = this.props;
    return (
      <Container key={"Container"} style={containerStyle} fluid>
        <NewContentModal
          key={"contentModal"}
          {...this.props}
          lists={{
            woxComponents: tableData.woxComponent,
            layouts: tableData.layout,
            pages: tableData.page
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
              <Dashboard
                user={this.props.axios.state.user}
                pages={this.props.tableData.page}
                woxComponents={this.props.tableData.woxComponent}
                users={this.props.tableData.user}
              />
            ) : (
              <ContentTable
                {...this.props}
                onRemoveContent={this.handleRemoveObjectFromDatabase}
                onGetContent={this.handleGetObjectFromDatabase}
                list={this.props.tableData[currentPage.typeOfData]}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
