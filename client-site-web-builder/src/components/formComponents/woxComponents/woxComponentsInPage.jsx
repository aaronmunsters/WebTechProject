import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { Row } from "react-bootstrap";

export default class ComponentsInPage extends Component {
  constructor(props) {
    super(props);
    const { allComponents } = props;
    let newComponents = {};
    allComponents.map(component => {
      return (newComponents[component.id] = component);
    });
    this.state = {
      components: newComponents,
      columns: {
        compsL: {
          id: "compsL",
          title: "Left Column",
          componentIds: this.props.compsL
        },
        compsM: {
          id: "compsM",
          title: "Center Column",
          componentIds: this.props.compsM
        },
        compsR: {
          id: "compsR",
          title: "Right Column",
          componentIds: this.props.compsR
        }
      },
      columnOrder: ["compsL", "compsM", "compsR"]
    };
  }
  componentDidMount() {
    const { allComponents } = this.props;
    let newComponents = {};
    allComponents.map(component => {
      return (newComponents[component.id] = component);
    });
    this.setState({ components: newComponents });
  }
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = this.reorder(
        this.state.columns[source.droppableId].componentIds,
        source.index,
        destination.index
      );
      let newcolumns = this.state.columns;
      newcolumns[destination.droppableId].componentIds = items;
      this.props.onReorder({
        name: newcolumns[destination.droppableId].id,
        data: items
      });
      this.setState({ columns: newcolumns });
    } else {
      const result = this.move(
        this.state.columns[source.droppableId].componentIds,
        this.state.columns[destination.droppableId].componentIds,
        source,
        destination
      );
      let newcolumns = this.state.columns;
      newcolumns[destination.droppableId].componentIds =
        result[destination.droppableId];
      newcolumns[source.droppableId].componentIds = result[source.droppableId];
      this.props.onMove(
        {
          name: newcolumns[destination.droppableId].id,
          data: result[destination.droppableId]
        },
        {
          name: newcolumns[source.droppableId].id,
          data: result[source.droppableId]
        }
      );
      this.setState({ columns: newcolumns });
    }
  };
  onAddComponent = (id, destinationId) => {
    const newcolumns = this.state.columns;
    const newcolumn = newcolumns[destinationId];
    newcolumn.componentIds.push(id);
    this.props.onReorder({ name: destinationId, data: newcolumn.componentIds });
    this.setState({ columns: newcolumns });
  };
  render() {
    let newComponentPossibilities = [].concat(this.props.allComponents);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const components = column.componentIds.map(componentId => {
              let index = newComponentPossibilities.indexOf(
                this.state.components[componentId]
              );
              if (index > -1) {
                newComponentPossibilities.splice(index, 1);
              }
              return this.state.components[componentId];
            });

            return (
              <Column
                key={column.id}
                column={column}
                onAddComponent={this.onAddComponent}
                components={components}
                componentsList={newComponentPossibilities}
              />
            );
          })}
        </Row>
      </DragDropContext>
    );
  }
}