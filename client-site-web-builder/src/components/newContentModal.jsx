import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
//import axios from "axios";

export default class NewContentModal extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetStateData = this.handleSetStateData.bind(this);
  }
  state = {
    serverFetched: false,
    cells: [],
    data: {}
  };

  componentDidUpdate(nextProps) {
    const { show, currentObject } = this.props;
    if (nextProps.show !== show) {
      if (show) {
        const newObjectData =
          show === "New"
            ? this.getDefaultObject()
            : show === "Edit"
            ? currentObject
            : {};
        this.setState({ data: newObjectData });
      }
    }
  }

  getDefaultObject() {
    const { destinations, typeOfContent } = this.props;
    let newObjectData = {};
    const setObjectElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => setObjectElement(formElement));
      } else if (element.options !== undefined) {
        element.options.map((option, index) => {
          if (index === 0 && this.state.data[element.key] === undefined)
            newObjectData[element.key] = option.value;
          return null;
        });
      } else {
        newObjectData[element.key] = "";
      }
    };
    destinations.map(element =>
      typeOfContent === element.typeOfData
        ? element.newContent.map(FormElement =>
            setObjectElement(FormElement, newObjectData)
          )
        : null
    );
    return newObjectData;
  }

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
            defaultValue={this.state.data[element.key]}
          >
            {element.options !== undefined
              ? element.options.map(option => {
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
    const { show, onHide, typeOfContent, destinations, onSubmit } = this.props;
    return (
      <Modal
        //{...props}
        show={show === false ? false : true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closebutton="true">
          <Modal.Title id="insert new content">
            {show} {typeOfContent}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={event => {
              event.preventDefault();
              onSubmit(this.state.data);
              this.setState({ data: {} });
            }}
          >
            {destinations.map(element =>
              typeOfContent === element.typeOfData
                ? element.newContent.map(FormElement =>
                    this.handleFormElement(FormElement)
                  )
                : null
            )}
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
