import React, { Component } from "react";
import { Col, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import WoxComponent from "./woxComponent";

export default class Column extends Component {
  state = {
    grid: 8
  };
  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    padding: this.state.grid,
    transition: "background-color 0.2s ease"
  });

  render() {
    return (
      <Col xs lg={this.props.columnwidth}>
        <p style={{ textAlign: "center" }}>{this.props.column.title}</p>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.components.map((woxComponent, index) => (
                <WoxComponent
                  onDelete={() => this.props.onDelete(index)}
                  key={woxComponent.id}
                  component={woxComponent}
                  index={index}
                  grid={this.state.grid}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Dropdown block="true" variant="secondary" size="lg">
          <Dropdown.Toggle block="true">Add component</Dropdown.Toggle>
          <Dropdown.Menu block="true">
            <Dropdown.Header>Exisiting</Dropdown.Header>
            {this.props.componentsList.map(component => {
              return (
                <OverlayTrigger
                  key={component.id}
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={props => {
                    const { show, ...other } = props;
                    return (
                      <Tooltip show={props.show.toString()} {...other}>
                        {component.description}}
                      </Tooltip>
                    );
                  }}
                >
                  <Dropdown.Item
                    style={{ width: "100%" }}
                    key={component.id}
                    onClick={() =>
                      this.props.onAddComponent(
                        component.id,
                        this.props.column.id
                      )
                    }
                  >
                    {component.title}
                  </Dropdown.Item>
                </OverlayTrigger>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    );
  }
}
