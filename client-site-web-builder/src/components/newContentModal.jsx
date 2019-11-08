import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
//import axios from "axios";

export default class NewContentModal extends Component {
  state = {
    typeOfContent: this.props.typeOfContent,
    serverFetched: false,
    cells: []
  };

  static getDerivedStateFromProps(props, state) {
    /*let responce = await axios.get("http://localhost:3001/pages");
    console.log(responce);
    this.setState({
      serverFetched: true,
      cells: responce
    });
    */
    switch (props.typeOfContent) {
      case "Page":
        return {
          cells: [
            { id: "Title" },
            { id: "Author" },
            { id: "Created" },
            { id: "Published" },
            { id: "Content" }
          ]
        };
      case "WoxComponent":
        return {
          cells: [{ id: "Title" }, { id: "Author" }, { id: "Created" }]
        };
      case "User":
        return {
          cells: [{ id: "User" }]
        };
      default:
        return {
          cells: [{ id: "Error" }]
        };
    }
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
          <Form>
            {this.state.cells.map(element => (
              <Form.Group controlId={element.id} key={element.id}>
                <Form.Label>{element.id}</Form.Label>
                <Form.Control placeholder={element.value}></Form.Control>
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
