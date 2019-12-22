import React, { Component } from "react";
import StandardElement from "../standardElement";
import PictureInsert from "./../importPicture/pictureInsert";
import { Form } from "react-bootstrap";

/* ------------------------------------------------------------------
a clickable picture component 
-------------------------------------------------------------------*/
export default class ClickPick extends Component {
  constructor(props) {
    super(props);
    this.handleAddPicture = this.handleAddPicture.bind(this);
  }
  state = {
    pictureId: this.props.elementData.id,
    link: this.props.elementData.link
  };

  handleAddPicture(newId) {
    const { onChange } = this.props;
    this.sestState = { pictureId: newId };
    onChange({ link: this.state.link, id: newId });
  }

  render() {
    const { element, onChange } = this.props;
    const { elementData, ...InsertProps } = this.props;
    const { label, ...ElementProps } = element;
    return (
      <div key={"Row" + element.key}>
        <Form.Label>Link</Form.Label>
        <StandardElement
          element={{ label: "Link", ...ElementProps }}
          group={true}
          value={elementData.link}
          onChange={target => {
            this.setState({ link: target.value });
            onChange({
              value: { link: target.value, id: this.state.pictureId },
              name: target.name
            });
          }}
        />
        <PictureInsert
          isMulti={false}
          onAddPicture={this.handleAddPicture}
          elementData={{ ids: this.state.pictureId }}
          {...InsertProps}
        />
      </div>
    );
  }
}
