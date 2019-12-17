import React, { Component } from "react";
import Dropzone from "react-dropzone-uploader";

import "react-dropzone-uploader/dist/styles.css";

export default class CarrouselElement extends Component {
  onChangeHandler = event => {
    console.log(event.target.files[0]);
  };
  getUploadParams = () => {
    return { url: "google.com" };
  };

  handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };
  render() {
    return (
      <Dropzone
        //getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      />
    );
  }
}
