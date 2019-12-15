import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { Row } from "react-bootstrap";

export default class WoxComponents extends Component {
  constructor(props) {
    super(props);
    const { woxComponents, layout } = props;
    let newComponents = {};
    woxComponents.map(component => {
      return (newComponents[component.id] = component);
    });
    let columnOrder = [];
    switch (layout) {
      case "single":
        columnOrder = ["compsM"];
        break;
      case "small-left":
        columnOrder = ["compsL", "compsM"];
        break;
      case "small-right":
        columnOrder = ["compsM", "compsR"];
        break;
      default:
        columnOrder = ["compsL", "compsM", "compsR"];
    }
    this.state = {
      columnWidth: 12 / columnOrder.length,
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
      columnOrder: columnOrder
    };
  }
  componentDidMount() {
    const { woxComponents } = this.props;
    let newComponents = {};
    woxComponents.map(component => {
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
  handleDelete = (index, columnId) => {
    const { columns } = this.state;
    console.log(columns[columnId], columnId);
    const newcomponentIds = columns[columnId].componentIds;
    newcomponentIds.splice(index, 1);
    columns[columnId].componentIds = newcomponentIds;
    this.setState({ columns: columns });
    this.props.onChange({
      name: columnId,
      value: columns[columnId].componentIds
    });
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
      this.props.onChange({
        name: newcolumns[destination.droppableId].id,
        value: items
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
      this.props.onChange({
        name: newcolumns[destination.droppableId].id,
        value: result[destination.droppableId]
      });
      this.props.onChange({
        name: newcolumns[source.droppableId].id,
        value: result[source.droppableId]
      });
      this.setState({ columns: newcolumns });
    }
  };

  onAddComponent = (id, destinationId) => {
    const newcolumns = this.state.columns;
    const newcolumn = newcolumns[destinationId];
    newcolumn.componentIds.push(id);
    this.props.onChange({ name: destinationId, value: newcolumn.componentIds });
    this.setState({ columns: newcolumns });
  };
  render() {
    let newComponentPossibilities = [].concat(this.props.woxComponents);
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
                width={this.state.columnWidth}
                onDelete={index => this.handleDelete(index, columnId)}
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
