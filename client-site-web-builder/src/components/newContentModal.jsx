import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import WoxComponents from "./formComponents/woxComponents/woxComponents";
import ColorPicker from "./formComponents/colorPicker/colorPicker";
import StandardElement from "./formComponents/standardElement";
import ContentElement from "./formComponents/contentElement/contentElement";
//import axios from "axios";

export default class NewContentModal extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetStateData = this.handleSetStateData.bind(this);
    this.handleFormElement = this.handleFormElement.bind(this);
  }
  state = {
    canShow: false,
    cells: [],
    currentDestination: {},
    newContentList: [],
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
          data: this.getCurrentObject(currentObject, show, currentDestination),
          canShow: true
        });
      } else this.setState({ data: {}, canShow: false });
    }
  }

  getCurrentObject(object, show, destination) {
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
        newObjectData[element.key] =
          show === "Edit" ? object[element.key] : element.options[0].value;
      } else if (element.contentType === "object") {
        newObjectData[element.key] =
          show === "Edit" ? JSON.parse(object[element.key]) : {};
      } else if (element.options) {
        newObjectData[element.key] =
          show === "Edit"
            ? object[element.key]
            : this.props.lists[element.options][0].id;
      } else {
        newObjectData[element.key] = show === "Edit" ? object[element.key] : "";
      }
    };
    destination.newContent.map(setObjectElement);
    console.log("-----mydata-----", newObjectData);
    return newObjectData;
  }

  handleInputChange(target) {
    let value = target.value;
    const name = target.name;
    this.handleSetStateData(name, value);
  }

  handleSetStateData(name, value) {
    let dataCopy = this.state.data;
    dataCopy[name] = value;
    this.setState({ data: dataCopy });
  }

  handleFormSubmit(event) {
    const { onAddNewContent, onEditContent, typeOfContent, show } = this.props;
    const { currentDestination, data, currentId } = this.state;
    event.preventDefault();
    const everyElement = element => {
      if (element.group) {
        element.groupElements.map(formElement => everyElement(formElement));
      } else if (typeof data[element.key] === "object") {
        let newFormElement = JSON.stringify(data[element.key]);
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
    currentDestination.newContent.map(everyElement);
    if (show === "New") onAddNewContent(data, typeOfContent);
    else if (show === "Edit") onEditContent(data, currentId, typeOfContent);
  }

  getvalue(element) {
    const { data } = this.state;
    if (typeof data[element.key] === "object") {
      //special cases:
      if (element.key === "pages") {
        return data[element.key].toString();
      } else if (element.key === "content") {
        return data[element.key].text;
      } else return data[element.key].id;
    } else return data[element.key];
  }

  handleFormElement(element, group) {
    const { data } = this.state;
    if (element.group) {
      return (
        <Form.Row key={"Row" + element.groupElements[0].key}>
          {element.groupElements.map(formElement =>
            this.handleFormElement(formElement, true)
          )}
        </Form.Row>
      );
    } else if (element.key === "backgroundColor") {
      return (
        <ColorPicker
          key={element.label}
          onChange={this.handleInputChange}
          color={data[element.key]}
        />
      );
    } else if (element.key === "comps") {
      let layoutTypeValue = "";
      this.props.lists.layouts.map(option => {
        if (option.id === data.layout) layoutTypeValue = option.columnType;
        return null;
      });
      return (
        <WoxComponents
          key={element.label}
          layout={layoutTypeValue}
          compsL={data.compsL}
          compsM={data.compsM}
          compsR={data.compsR}
          woxComponents={this.props.lists[element.options]}
          onChange={this.handleInputChange}
        />
      );
    } else if (element.key === "content") {
      return (
        <ContentElement
          key={element.label}
          element={element}
          woxComponents={this.props.lists.woxComponents}
          elementData={this.state.data[element.key]}
          type={this.state.data.type}
          onChange={this.handleInputChange}
        />
      );
    } else {
      return (
        <StandardElement
          key={element.label}
          element={element}
          group={group}
          value={this.getvalue(element)}
          lists={this.props.lists}
          onChange={this.handleInputChange}
        />
      );
    }
  }

  render() {
    const { show, onHide, typeOfContent } = this.props;
    if (show && this.state.canShow)
      return (
        <Modal
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
              {this.state.currentDestination.newContent.map(element =>
                this.handleFormElement(element)
              )}
              <button type="submit">Submit</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    else return null;
  }
}
