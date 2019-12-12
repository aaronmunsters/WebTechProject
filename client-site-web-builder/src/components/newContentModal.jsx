import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import ComponentsInPage from "./woxComponentTables/woxComponentsInPage";
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
    currentId: 0,
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
          data: this.getCurrentObject(currentObject, show)
        });
      } else this.setState({ data: {} });
    }
  }

  getCurrentObject(object, show) {
    let newObjectData = {};
    if (show === "Edit") {
      this.setState({ currentId: object.id });
    }
    const setObjectElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => setObjectElement(formElement));
      } else if (element.contentType === "list") {
        newObjectData[element.key] =
          show === "Edit" ? JSON.parse(object[element.key]) : [];
      } else if (element.key === "comps") {
        const { compsL, compsM, compsR } = this.props.currentObject;
        newObjectData.compsL = show === "Edit" ? JSON.parse(compsL) : [];
        newObjectData.compsM = show === "Edit" ? JSON.parse(compsM) : [];
        newObjectData.compsR = show === "Edit" ? JSON.parse(compsR) : [];
      } else if (Array.isArray(element.options)) {
        newObjectData[element.key] = element.options[0].value;
      } else if (element.contentType === "object") {
        newObjectData[element.key] =
          show === "Edit" ? JSON.parse(object[element.key]) : {};
      } else if (element.options) {
        newObjectData[element.key] = this.props.lists[element.options][0].id;
      } else {
        newObjectData[element.key] = show === "Edit" ? object[element.key] : "";
      }
    };
    this.mapOverNewContent(setObjectElement);
    console.log("-----mydata-----", newObjectData);
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
      if (name === "content") {
        value = { text: value };
      } else value = { id: value };
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
      } else if (typeof this.state.data[element.key] === "object") {
        let newFormElement = JSON.stringify(this.state.data[element.key]);
        this.handleSetStateData(element.key, newFormElement);
      } else if (element.key === "comps") {
        this.handleSetStateData(
          "compsL",
          JSON.stringify(this.state.data.compsL)
        );
        this.handleSetStateData(
          "compsM",
          JSON.stringify(this.state.data.compsM)
        );
        this.handleSetStateData(
          "compsR",
          JSON.stringify(this.state.data.compsR)
        );
      }
      return null;
    };
    this.mapOverNewContent(everyElement);
    onSubmit(this.state.data, this.state.currentId);
  }

  getvalue(element) {
    if (typeof this.state.data[element.key] === "object") {
      //special cases:
      if (element.key === "pages") {
        return this.state.data[element.key].toString();
      } else if (element.key === "content") {
        return this.state.data[element.key].text;
      } else return this.state.data[element.key].id;
    } else return this.state.data[element.key];
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
    } else if (element.key === "comps") {
      const { compsL, compsM, compsR } = this.props.currentObject;
      const { show } = this.props;
      return (
        <ComponentsInPage
          key="element.label"
          compsL={show === "Edit" ? JSON.parse(compsL) : []}
          compsM={show === "Edit" ? JSON.parse(compsM) : []}
          compsR={show === "Edit" ? JSON.parse(compsR) : []}
          allComponents={this.props.lists[element.options]}
          onMove={(column1, column2) => {
            this.handleSetStateData([column1.name], column1.data);
            this.handleSetStateData([column2.name], column2.data);
          }}
          onReorder={column => {
            this.handleSetStateData([column.name], column.data);
          }}
        />
      );
    } else {
      return (
        <Form.Group
          key={element.key}
          as={group ? Col : undefined}
          md={group ? element.mdSize : 12}
        >
          <Form.Label>{element.label}</Form.Label>
          <Form.Control
            disabled={element.disabled ? true : false}
            multiple={element.formType === "multipleselect" ? true : false}
            as={element.formType.includes("select") ? "select" : undefined}
            type={element.inputType}
            name={element.key}
            placeholder={element.label}
            onChange={this.handleInputChange}
            key={element.key}
            defaultValue={this.getvalue(element)}
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
        size="xl"
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
