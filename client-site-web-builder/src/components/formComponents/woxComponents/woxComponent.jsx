import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

export default class WoxComponent extends Component {
  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: this.props.grid * 2,
    margin: `0 0 ${this.props.grid}px 0`,
    borderRadius: "5px",

    // change background colour if dragging
    border: "1px solid darkgrey",
    background: isDragging ? "lightgreen" : "lightgrey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  render() {
    return (
      <Draggable
        key={this.props.component.id}
        draggableId={this.props.component.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={this.getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {this.props.component.title}
          </div>
        )}
      </Draggable>
    );
  }
}
