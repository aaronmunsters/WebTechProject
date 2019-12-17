import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

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
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">upload</InputGroup.Text>
        </InputGroup.Prepend>
        <div className="custom-file">
          <FormControl
            onChange={event => {
              console.log(event);
            }}
            type="file"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          />
          <label className="custom-file-label" htmlFor="inputGroupFile01">
            Choose file
          </label>
        </div>
      </InputGroup>
    );
  }
}
