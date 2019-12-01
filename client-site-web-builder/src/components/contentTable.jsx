import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, ButtonToolbar } from "react-bootstrap";

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
              variant="danger"
              onClick={() => onRemoveContent(listItem.id)}
            >
              🗑
            </Button>
          </ButtonToolbar>
        ))
    );
    return (
      <div>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={list}
          columns={currentPage.tableColumns}
        />
      </div>
    );
  }
}

export default ContentTable;
