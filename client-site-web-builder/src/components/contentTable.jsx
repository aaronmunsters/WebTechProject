import React, { Component } from "react";
//import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapTable from "react-bootstrap-table-next";
import { Container } from "react-bootstrap";

class ContentTable extends Component {
  render() {
    const { destinationIndex, pages } = this.props;
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
          data={destinationIndex === 1 ? pages : []}
          columns={columns}
        />
        {/*
          <BootstrapTable
            ref="table"
            data={destinationIndex === 1 ? pages : []}
            pagination
            search={true}
            multiColumnSearch={true}
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
          </BootstrapTable> */}
      </div>
    );
  }
}

export default ContentTable;
