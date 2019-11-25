import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
//import axios from "axios";

export default class NewContentModal extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  state = {
    typeOfContent: this.props.typeOfContent,
    serverFetched: false,
    cells: [],
    data: {}
  };

  static getDerivedStateFromProps(props, state) {
    switch (props.typeOfContent) {
      case "Page":
        return {
          cells: [{ id: "title" }, { id: "content" }]
        };
      case "WoxComponent":
        return {
          cells: [{ id: "title" }, { id: "content" }]
        };
      case "User":
        return {
          cells: [{ id: "title" }, { id: "content" }]
        };
      default:
        return {
          cells: [{ id: "Error" }]
        };
    }
  }

  handleInputChange(event) {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    let dataCopy = this.state.data;
    dataCopy[name] = value;
    this.setState({
      data: dataCopy
    });
  }

  render() {
    return (
      <Modal
        //{...props}
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closebutton="true">
          <Modal.Title id="insert new content">New Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              event.preventDefault();
              this.props.onSubmit(this.state.data);
            }}
          >
            {this.state.cells.map(element => (
              <Form.Group controlId={element.id} key={element.id}>
                <Form.Label>{element.id}</Form.Label>
                <Form.Control
                  required
                  name={element.id}
                  onChange={this.handleInputChange}
                  placeholder={element.value}
                ></Form.Control>
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
