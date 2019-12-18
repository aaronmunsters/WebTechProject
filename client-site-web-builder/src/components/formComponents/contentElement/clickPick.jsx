import React, { Component } from "react";
import StandardElement from "../standardElement";
import PictureUpload from "./../importPicture/pictureUpload";
import { Form, Button } from "react-bootstrap";

export default class ClickPick extends Component {
  constructor(props) {
    super(props);
    this.handleUploadPic = this.handleUploadPic.bind(this);
  }
  state = {
    pictureId: "",
    link: "",
    pictureModal: false
  };
  handleUploadPic(id) {
    const { onChange } = this.props;
    this.setState({ pictureId: id, pictureModal: false });
    onChange({ value: { link: this.state.link, id: id }, name: "content" });
  }
  render() {
    const { axios, element, elementData, onChange } = this.props;
    const { label, ...rest } = element;
    return (
      <Form.Row key={"Row" + element.key}>
        <Form.Label>Link</Form.Label>
        <StandardElement
          element={{ label: "Link", ...rest }}
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
        <Button onClick={() => this.setState({ pictureModal: true })}>
          Upload Picture
        </Button>
        <PictureUpload
          show={this.state.pictureModal}
          onUpload={this.handleUploadPic}
          onCancel={() => this.setState({ pictureModal: false })}
          axios={axios}
        />
      </Form.Row>
    );
  }
}
