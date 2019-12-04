import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
//import axios from "axios";

export default class NewContentModal extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetStateData = this.handleSetStateData.bind(this);
    this.handleFormElement = this.handleFormElement.bind(this);
  }
  state = {
    serverFetched: false,
    cells: [],
    currentDestination: {},
    data: {}
  };

  componentDidUpdate(nextProps) {
    const { show, currentObject, destinations, typeOfContent } = this.props;
    if (nextProps.show !== show) {
      if (show) {
        let currentDestination = {};
        destinations.map(element => {
          if (typeOfContent === element.typeOfData)
            currentDestination = element;
          return null;
        });
        this.setState({
          currentDestination: currentDestination,
          data:
            show === "New"
              ? this.getDefaultObject()
              : this.getCurrentObject(currentObject)
        });
      } else this.setState({ data: {} });
      console.log("update", this.state.data);
    }
  }

  getCurrentObject(object) {
    let currentObject = object;
    const setObjectElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => setObjectElement(formElement));
      } else {
        if (element.isObject)
          currentObject[element.key] = JSON.parse(object[element.key]);
      }
    };
    this.mapOverNewContent(setObjectElement);
    return currentObject;
  }

  getDefaultObject() {
    const { lists } = this.props;
    let newObjectData = {};
    const setObjectElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => setObjectElement(formElement));
      } else if (Array.isArray(element.options)) {
        newObjectData[element.key] = element.options[0].value;
      } else if (element.options) {
        newObjectData[element.key] = { id: lists[element.options][0].id };
        console.log(newObjectData[element.key]);
      } else if (element.isObject) {
        newObjectData[element.key] = {};
      } else {
        newObjectData[element.key] = "";
      }
    };
    this.mapOverNewContent(setObjectElement);
    return newObjectData;
  }

  mapOverNewContent(myFunction) {
    const { destinations, typeOfContent } = this.props;
    return destinations.map(element =>
      typeOfContent === element.typeOfData
        ? element.newContent.map(FormElement => myFunction(FormElement))
        : null
    );
  }

  handleInputChange(event) {
    const target = event.currentTarget;
    let value = target.value;
    const name = target.name;
    if (typeof this.state.data[name] === "object") {
      value = { id: value };
    }
    this.handleSetStateData(name, value);
  }

  handleSetStateData(name, value) {
    let dataCopy = this.state.data;
    dataCopy[name] = value;
    this.setState({ data: dataCopy });
  }

  handleFormSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    const everyElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => everyElement(formElement));
      } else {
        //const newFormElement = JSON.stringify(this.state.data[element.key]);
        if (element.isObject) {
          let newFormElement = JSON.stringify(this.state.data[element.key]);
          console.log(newFormElement);
          this.handleSetStateData(element.key, newFormElement);
        }
        return null;
      }
    };
    this.mapOverNewContent(everyElement);
    console.log(this.state.data);
    onSubmit(this.state.data);
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
    } else {
      console.log("handleFormElement", this.state.data[element.key]);
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
                    <option value={list.id} key={list.id}>
                      {list.title}
                    </option>
                  );
                })
              : null}
          </Form.Control>
        </Form.Group>
      );
    }
  }

  render() {
    const { show, onHide, typeOfContent } = this.props;
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
          <form onSubmit={event => this.handleFormSubmit(event)}>
            {this.mapOverNewContent(this.handleFormElement)}
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
