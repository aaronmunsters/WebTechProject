import React, { Component } from "react";
import TitleBoard from "./titleBoard";
import NewContentModal from "./newContentModal";
import { Container, Row, Col } from "react-bootstrap";
import ContentTable from "./contentTable";
import Dashboard from "./dashboard";

/* ------------------------------------------------------------------
  This class desides what content has to be shown in each page, a page
  is everything underneath the navbar
  -------------------------------------------------------------------*/
export default class Page extends Component {
  state = {
    typeOfContent: "woxComponent",
    currentObject: {},
    modalShow: false
  };

  /* ------------------------------------------------------------------
  when an object needs to get fetched from the database (for editing),
  this happens here, the modalShow gets set to Edit because we are now
  editing an object, the type of content gets set so the modal knows
  what kind of form it needs to open.
  -------------------------------------------------------------------*/
  handleGetObjectFromDatabase = async objectId => {
    const { axios } = this.props;
    const responce = await axios.ConnectWithDatabase(
      "get",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    this.setState({
      modalShow: "Edit",
      typeOfContent: this.props.currentPage.typeOfData,
      currentObject: responce
    });
    return responce;
  };

  /* ------------------------------------------------------------------
  self explanatory: gets an Id and removes it from the database. It also
  refreshes the table of the page thats currently opened so the admin has
  some visual feedback that the object has indeed been removed
  -------------------------------------------------------------------*/
  handleRemoveObjectFromDatabase = async objectId => {
    const { axios, onRefreshTable } = this.props;
    const responce = await axios.ConnectWithDatabase(
      "delete",
      this.props.currentPage.typeOfData + "/" + objectId
    );
    onRefreshTable();
    return responce;
  };

  /* ------------------------------------------------------------------
  puts the new data in the database in the object that corresponds to id
  if there is no error while doing so it closes the modal and refreshes
  the table. It also passes the responce so the modal in question can
  display the error if neccesary
  -------------------------------------------------------------------*/
  handleEditObjectInDatabase = async (data, id, type) => {
    const { axios, onRefreshTable } = this.props;
    const responce = await axios.ConnectWithDatabase(
      "put",
      this.state.typeOfContent + "/" + id,
      data
    );
    if (!responce.error) {
      this.setState({ modalShow: false });
      onRefreshTable();
    }
    return responce;
  };

  /* ------------------------------------------------------------------
  adds new data to the database, the error handling works same as with
  the edit
  -------------------------------------------------------------------*/
  handleAddObjectToDatabase = async (data, type) => {
    const { axios, onRefreshTable } = this.props;
    const responce = await axios.ConnectWithDatabase(
      "post",
      this.state.typeOfContent,
      data
    );
    if (!responce.error) {
      this.setState({ modalShow: false });
      onRefreshTable();
    }
    return responce;
  };

  /* ------------------------------------------------------------------
  when a new modal needs to get openend this gets called
  -------------------------------------------------------------------*/
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
                viewTotal={this.props.viewTotal}
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
