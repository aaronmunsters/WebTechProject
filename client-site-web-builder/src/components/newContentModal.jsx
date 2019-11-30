import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
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

  handleInputChange(event) {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    this.handleSetStateData(name, value);
  }

  handleSetStateData(name, value) {
    let dataCopy = this.state.data;
    dataCopy[name] = value;
    this.setState({ data: dataCopy });
  }

  handleFormSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    this.props.onSubmit(this.state.data);
    this.setState({ data: {} });
  }

  handleFormElement(element, group) {
    if (element.group)
      return (
        <Form.Row key="Row">
          {element.groupElements.map(formElement =>
            this.handleFormElement(formElement, true)
          )}
        </Form.Row>
      );
    else
      return (
        <Form.Group
          key={element.key}
          as={group ? Col : undefined}
          md={group ? element.mdSize : 12}
        >
          <Form.Label>{element.label}</Form.Label>
          <Form.Control
            as={element.formType === "select" ? "select" : undefined}
            type={element.inputType}
            name={element.key}
            placeholder={element.label}
            onChange={this.handleInputChange}
            key={element.key}
          >
            {element.options !== undefined
              ? element.options.map((option, index) => {
                  if (index === 0 && this.state.data[element.key] === undefined)
                    this.handleSetStateData(element.key, option.value);
                  return (
                    <option value={option.value} key={option.value}>
                      {option.title}
                    </option>
                  );
                })
              : null}
          </Form.Control>
        </Form.Group>
      );
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
          <Modal.Title id="insert new content">
            New {this.props.typeOfContent}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.onSubmit(this.state.data);
              this.setState({ data: {} });
            }}
          >
            {this.props.destinations.map(element =>
              this.props.typeOfContent === element.typeOfData
                ? element.newContent.map(FormElement =>
                    this.handleFormElement(FormElement)
                  )
                : null
            )}
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
