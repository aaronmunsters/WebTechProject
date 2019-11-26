import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class ContentTable extends Component {
  render() {
    const { list } = this.props;
    const selectRow = {
      mode: "radio",
      hideSelectColumn: true,
      clickToSelect: true,
      bgColor: "#007bff"
    };

    return (
      <div>
        <BootstrapTable
          selectRow={selectRow}
          bootstrap4
          keyField="title"
          data={list}
          columns={this.props.currentPage.tableColumns}
        />
      </div>
    );
  }
}

export default ContentTable;
