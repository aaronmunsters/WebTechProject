import React, { Component } from "react";
import { Col } from "react-bootstrap";
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
        <h1> Strange</h1>
      </Col>
    );
  }
}
