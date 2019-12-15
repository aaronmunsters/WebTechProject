import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, ButtonToolbar } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";

class ContentTable extends Component {
  render() {
    let { list, onGetContent, onRemoveContent, currentPage } = this.props;
    list.map(
      listItem =>
        (listItem.buttons = (
          <ButtonToolbar>
            <Button variant="warning" onClick={() => onGetContent(listItem.id)}>
              Edit
            </Button>
            <Button
              variant={listItem.id === "default" ? "secondary" : "danger"}
              disabled={listItem.id === "default" ? true : false}
              onClick={() => onRemoveContent(listItem.id)}
            >
              🗑
            </Button>
          </ButtonToolbar>
        ))
    );
    const expandRow = {
      onlyOneExpanding: true,
      renderer: (row, rowIndex) => (
        <div>
          <h3>About this component:</h3>
          <p>{row.description}</p>
        </div>
      )
    };
    return (
      <div>
        <BootstrapTable
          bootstrap4
          condensed
          expandRow={expandRow}
          keyField="id"
          data={list}
          columns={currentPage.tableColumns}
          pagination={paginationFactory()}
          noDataIndication={() => <h1>Sorry nothing to see here</h1>}
        />
      </div>
    );
  }
}

export default ContentTable;
