import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import WoxComponent from "./woxComponent";

export default class Column extends Component {
  state = {
    grid: 8
  };
  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white",
    border: "3px solid pink",
    padding: this.state.grid,
    width: 250
  });

  render() {
    return (
      <Droppable droppableID={this.props.column.id}>
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
    );
  }
}
