import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button, Container } from "react-bootstrap";

class TestComponent extends Component {
  render() {
    const { destinationIndex } = this.props;
    const selectRowProp = {
      mode: "checkbox"
    };
    const content = [
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

    return (
      <div>
        <h1>{destinationIndex}</h1>
        <Container fluid>
          <BootstrapTable
            ref="table"
            data={destinationIndex === 1 ? content : []}
            pagination
            search={true}
            multiColumnSearch={true}
            selectRow={selectRowProp}
            insertRow={true}
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
      </div>
    );
  }
}

export default TestComponent;
