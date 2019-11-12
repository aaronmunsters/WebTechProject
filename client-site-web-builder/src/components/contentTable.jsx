import React, { Component } from "react";
//import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapTable from "react-bootstrap-table-next";

class ContentTable extends Component {
  render() {
    const { list } = this.props;
    const columns = [
      { dataField: "Title", text: "Title", sort: true },
      { dataField: "Author", text: "Author", sort: true },
      { dataField: "Date", text: "Date", sort: true },
      { dataField: "Published", text: "Published" },
      { dataField: "Buttons", text: "Buttons" }
    ];
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
          keyField="Title"
          data={list}
          columns={columns}
        />
      </div>
    );
  }
}

export default ContentTable;
