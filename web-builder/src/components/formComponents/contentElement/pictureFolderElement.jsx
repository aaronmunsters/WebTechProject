import React, { Component } from "react";
import PictureInsert from "./../importPicture/pictureInsert";

/* ------------------------------------------------------------------
A pictureFolderElement is pretty mutch the same as the carouselElement.
But on the front-end it will display the pictures in a folder instead
of in a carousel. We now have the attribute locationActive wich is just
given back as true because we want it to always give back the location.
We could make the user easily choose for himself if the location should
be active or not. But we chose not to.
-------------------------------------------------------------------*/
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
