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
        console.log(currentObject);
        this.setState({
          data: show === "New" ? this.getDefaultObject() : currentObject
        });
      } else this.setState({ data: {} });
    }
  }

  getDefaultObject() {
    const { destinations, typeOfContent, lists } = this.props;
    let newObjectData = {};
    const setObjectElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => setObjectElement(formElement));
      } else if (Array.isArray(element.options)) {
        newObjectData[element.key] = element.options[0].value;
      } else if (element.options) {
        newObjectData[element.key] = lists[element.options][0].title;
      } else {
        newObjectData[element.key] = "";
      }
    };
    destinations.map(element =>
      typeOfContent === element.typeOfData
        ? element.newContent.map(FormElement => setObjectElement(FormElement))
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
    if (element.group) {
      return (
        <Form.Row key={"Row" + element.groupElements[0].key}>
          {element.groupElements.map(formElement =>
            this.handleFormElement(formElement, true)
          )}
        </Form.Row>
      );
    } else
      return (
        <Form.Group
          key={element.key}
          as={group ? Col : undefined}
          md={group ? element.mdSize : 12}
        >
          <Form.Label>{element.label}</Form.Label>
          <Form.Control
            disabled={element.disabled ? true : false}
            as={element.formType === "select" ? "select" : undefined}
            type={element.inputType}
            name={element.key}
            placeholder={element.label}
            onChange={this.handleInputChange}
            key={element.key}
            defaultValue={this.state.data[element.key]}
          >
            {Array.isArray(element.options)
              ? element.options.map(option => {
                  return (
                    <option value={option.value} key={option.value}>
                      {option.title}
                    </option>
                  );
                })
              : element.options
              ? this.props.lists[element.options].map(list => {
                  return (
                    <option value={list.title} key={list.id}>
                      {list.title}
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
              destinations.map(element =>
                typeOfContent === element.typeOfData
                  ? element.newContent.map(FormElement => {
                      const newFormElement =
                        "{" + this.state.data[FormElement.key] + "}";

                      if (FormElement.isObject)
                        this.handleSetStateData(
                          FormElement.key,
                          newFormElement
                        );
                      return null;
                    })
                  : null
              );
              onSubmit(this.state.data);
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
