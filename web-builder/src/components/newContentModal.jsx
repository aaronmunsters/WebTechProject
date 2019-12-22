import React, { Component } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import FormElement from "./formComponents/formElement";

/* ------------------------------------------------------------------
the modal that gets opened when some content gets eddited or added
-------------------------------------------------------------------*/
export default class NewContentModal extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetStateData = this.handleSetStateData.bind(this);
  }
  state = {
    canShow: false,
    cells: [],
    currentDestination: {},
    newContentList: [],
    currentId: 0,
    data: {},
    error: false
  };

  /* ------------------------------------------------------------------
  everytime the components gets updated it checks if the show prop has
  changed, only when it has. It will do something. When it gets set to
  "edit" or "new" the data gets set to the current object and canShow
  gets set to true. This means that it is possible for the render to
  rerender.
  -------------------------------------------------------------------*/
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

  /* ------------------------------------------------------------------
  If the show is set tot "edit", we parse the correct data en set the
  object to a usabe one. Otherwise when its "new" it will create a new
  empty object. It looks at all special cases and handles them all
  in the correct way.
  -------------------------------------------------------------------*/
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
      } else if (element.formType === "multiselect") {
        newObjectData[element.key] =
          show === "Edit" ? JSON.parse(object[element.key]) : [];
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
    return newObjectData;
  }

  /* ------------------------------------------------------------------
  when the input of an Element gets changed, it updates the data aswell
  -------------------------------------------------------------------*/
  handleInputChange(target) {
    let value = target.value;
    const name = target.name;
    this.setState({ error: false });
    this.handleSetStateData(name, value);
  }

  /* ------------------------------------------------------------------
  simply sets the attribute of name "name" to value "value" of the data
  object in state
  -------------------------------------------------------------------*/
  handleSetStateData(name, value) {
    let dataCopy = this.state.data;
    dataCopy[name] = value;
    this.setState({ data: dataCopy });
  }

  /* ------------------------------------------------------------------
  When a form is submitted, all the objects and arrays need to be 
  stringified first. When its submitted it checks whether the backend
  has given back an error or not. If it has, it sets error to said
  error so the Alert knows what error to display
  -------------------------------------------------------------------*/
  handleFormSubmit = async event => {
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
    let responce = "";
    if (show === "New") responce = await onAddNewContent(data, typeOfContent);
    else if (show === "Edit")
      responce = await onEditContent(data, currentId, typeOfContent);
    if (responce.error) this.setState({ error: responce.error });
  };

  render() {
    const { show, onHide, typeOfContent } = this.props;
    if (show && this.state.canShow)
      return (
        <Modal
          key={"modal"}
          show={show === false ? false : true}
          onHide={onHide}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Alert
            /* ------------------------------------------------------------------
            only shows when an error has occured
            -------------------------------------------------------------------*/
            show={this.state.error ? true : false}
            key="incorrect"
            variant="danger"
          >
            {this.state.error}
          </Alert>
          <Modal.Header closebutton="true">
            <Modal.Title id="insert new content">
              {show} {typeOfContent}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={event => this.handleFormSubmit(event)}>
              {this.state.currentDestination.newContent.map(element => (
                <FormElement
                  axios={this.props.axios}
                  key={element.key}
                  data={this.state.data}
                  element={element}
                  lists={this.props.lists}
                  onChange={this.handleInputChange}
                />
              ))}
              <Button type="submit">Submit</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    else return null;
  }
}
