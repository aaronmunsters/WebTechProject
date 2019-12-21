import React, { Component } from "react";
import PictureInsert from "./../importPicture/pictureInsert";

export default class CarrouselElement extends Component {
  constructor(props) {
    super(props);
    this.handleAddPicture = this.handleAddPicture.bind(this);
  }
  handleAddPicture(newIds) {
    const { onChange } = this.props;
    onChange({
      customCaption: true,
      singleCaption: true,
      captions: true,
      captionActive: true,
      ids: newIds
    });
  }
  render() {
    return (
      <PictureInsert
        isMulti={true}
        onAddPicture={this.handleAddPicture}
        {...this.props}
      />
    );
  }
}
