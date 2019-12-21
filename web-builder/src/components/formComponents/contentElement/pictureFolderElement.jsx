import React, { Component } from "react";
import PictureInsert from "./../importPicture/pictureInsert";

export default class PictureFolderElement extends Component {
  constructor(props) {
    super(props);
    this.handleAddPicture = this.handleAddPicture.bind(this);
  }
  handleAddPicture(newIds) {
    const { onChange } = this.props;
    onChange({
      locationActive: true,
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
