import React, { Component } from "react";
import PictureInsert from "../importPicture/pictureInsert";

/* ------------------------------------------------------------------
  the captions are not fully implemented yet because they wouldn't really
  fit the aestethics we where looking for. Yet these could easily be 
  added since the front and back-end are almost completely done.
  For now we just give back false for all the caption related attributes.
  The Ids list is created by PictureInsert
  -------------------------------------------------------------------*/
export default class CarouselElement extends Component {
  constructor(props) {
    super(props);
    this.handleAddPicture = this.handleAddPicture.bind(this);
  }
  handleAddPicture(newIds) {
    const { onChange } = this.props;
    onChange({
      customCaption: false,
      singleCaption: false,
      captions: false,
      captionActive: false,
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
