import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, ButtonToolbar } from "react-bootstrap";

class ContentTable extends Component {
  render() {
    let { list, onGetContent } = this.props;
    list.map(
      listItem =>
        (listItem.buttons = (
          <ButtonToolbar>
            <Button variant="warning" onClick={() => onGetContent(listItem.id)}>
              Edit
            </Button>
            <Button variant="danger">🗑</Button>
          </ButtonToolbar>
        ))
    );
    return (
      <div>
        <BootstrapTable
          bootstrap4
          keyField="date"
          data={list}
          columns={this.props.currentPage.tableColumns}
        />
      </div>
    );
  }
}

export default ContentTable;
