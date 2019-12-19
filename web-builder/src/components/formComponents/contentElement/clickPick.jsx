import React, { Component } from "react";
import StandardElement from "../standardElement";
import PictureUpload from "./../importPicture/pictureUpload";
import MultiSelect from "./../multiSelect";
import { Form, Button } from "react-bootstrap";

export default class ClickPick extends Component {
  constructor(props) {
    super(props);
    this.handleUploadPic = this.handleUploadPic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    pictureId: this.props.elementData.id,
    link: this.props.elementData.link,
    pictureModal: false,
    canShow: false,
    pictures: []
  };

  componentDidMount = async () => {
    const { axios } = this.props;
    let pics = await axios.ConnectWithDatabase("get", "image", {
      col_filter: ["title", "id"]
    });
    pics = pics.data.map(picture => {
      return { label: picture.title, value: picture.id };
    });
    this.setState({ pictures: pics, canShow: true });
  };

  handleUploadPic(id) {
    const { onChange } = this.props;
    this.setState({ pictureId: id, pictureModal: false });
    onChange({ value: { link: this.state.link, id: id }, name: "content" });
  }

  handleChange(reactions) {
    const { onChange } = this.props;
    this.setState({
      pictureIds: reactions.value
    });
    onChange({
      value: {
        link: this.state.link,
        id: reactions.value
      },
      name: "content"
    });
  }

  render() {
    const { axios, element, elementData, onChange } = this.props;
    const { label, ...rest } = element;
    if (this.state.canShow)
      return (
        <div key={"Row" + element.key}>
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
          <Form.Label>Picture</Form.Label>
          <MultiSelect
            key={"picture"}
            name={"pictures"}
            onChange={this.handleChange}
            value={this.state.id}
            options={this.state.pictures}
            isMulti={false}
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
        </div>
      );
    else return null;
  }
}
