import React, { Component } from "react";
import NewFileModal from "./NewFileModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button, Container, Jumbotron } from "react-bootstrap";

const pages = [
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
];

class ContentLayout extends Component {
  handleBtnClick = () => {
    pages[0].Author = "Aaron";
  };

  createCustomModal = (
    onModalClose,
    onSave,
    columns,
    validateState,
    ignoreEditable
  ) => {
    const attr = {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    };
    return <NewFileModal {...attr} />;
  };

  createCustomInsertButton = openModal => {
    return (
      <button style={{ color: "red" }} onClick={openModal}>
        Add rows
      </button>
    );
  };

  render() {
    const { destinationIndex } = this.props;

    let content;

    const selectRowProp = {
      mode: "checkbox"
    };

    const options = {
      insertModal: this.createCustomModal
    };

    if (destinationIndex === 0) {
      content = (
        <Jumbotron>
          <h2>Dashboard</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
            possimus alias fuga culpa libero illum, consequatur facere magnam
            sapiente ratione ipsam, ea eos necessitatibus earum error enim
            temporibus, ipsum sunt.
          </p>
        </Jumbotron>
      );
    } else {
      content = (
        <Container fluid>
          <BootstrapTable
            ref="table"
            data={destinationIndex === 1 ? pages : []}
            pagination
            search={true}
            multiColumnSearch={true}
            selectRow={selectRowProp}
            options={options}
            insertRow
          >
            <TableHeaderColumn dataField="Title" isKey={true} dataSort={true}>
              Title
            </TableHeaderColumn>
            <TableHeaderColumn dataField="Author" dataSort={true}>
              Author
            </TableHeaderColumn>
            <TableHeaderColumn dataField="Created" dataSort={true}>
              Created
            </TableHeaderColumn>
            <TableHeaderColumn dataField="Published" dataSort={true}>
              Published
            </TableHeaderColumn>
            <TableHeaderColumn dataField="Buttons"></TableHeaderColumn>
          </BootstrapTable>

          <Button onClick={this.handleBtnClick}>Test</Button>
        </Container>
      );
    }
    return <div>{content}</div>;
  }
}

export default ContentLayout;
