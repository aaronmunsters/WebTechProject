import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Container } from "react-bootstrap";

class ContentTable extends Component {
  render() {
    const { destinationIndex, pages } = this.props;

    return (
      <div>
        <Container fluid>
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
          </BootstrapTable>
        </Container>
      </div>
    );
  }
}

export default ContentTable;
