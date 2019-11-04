import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button, Container } from "react-bootstrap";

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.products = [
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
    this.state = {
      data: this.products
    };
  }

  onAddRow(row) {
    this.products.push(row);
    this.setState({
      data: this.products
    });
  }

  render() {
    console.log("got here");
    return (
      <RemoteInsertRow onAddRow={this.onAddRow.bind(this)} {...this.state} />
    );
  }
}

class RemoteInsertRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { destinationIndex } = this.props;
    const selectRowProp = {
      mode: "checkbox"
    };

    return (
      <div>
        <h1>{destinationIndex}</h1>
        <Container fluid>
          <BootstrapTable
            ref="table"
            data={this.props.data}
            pagination
            search={true}
            multiColumnSearch={true}
            selectRow={selectRowProp}
            options={{ onAddRow: this.props.onAddRow }}
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
