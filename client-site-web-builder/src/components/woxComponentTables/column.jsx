import React, { Component } from "react";
import { Col, Dropdown } from "react-bootstrap";
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
      <Col xs lg="4">
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.components.map((woxComponent, index) => (
                <WoxComponent
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
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Exisiting</Dropdown.Header>
            {this.props.componentsList.map(component => {
              return (
                <Dropdown.Item
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
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    );
  }
}
