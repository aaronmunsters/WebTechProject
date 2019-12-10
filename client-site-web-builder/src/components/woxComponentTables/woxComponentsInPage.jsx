import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";

export default class ComponentsInPage extends Component {
  state = {
    components: {
      component1: { id: "component1", content: "content1" },
      component2: { id: "component2", content: "content2" },
      component3: { id: "component3", content: "content3" },
      component4: { id: "component4", content: "content4" }
    },
    columns: {
      column1: {
        id: "column1",
        title: "column1",
        componentIds: ["component1", "component2", "component3", "component4"]
      }
    },
    columnOrder: ["column1"]
  };
  onDragEnd = result => {
    //todo
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          console.log(columnId);
          const column = this.state.columns[columnId];
          const components = column.componentIds.map(
            componentId => this.state.components[componentId]
          );
          return (
            <Column key={column.id} column={column} components={components} />
          );
        })}
      </DragDropContext>
    );
  }
}
