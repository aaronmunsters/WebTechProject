import React, { Component } from "react";
import PictureUpload from "./../importPicture/pictureUpload";
import MultiSelect from "./../multiSelect";
import { Button } from "react-bootstrap";

export default class PictureFolderElement extends Component {
  constructor(props) {
    super(props);
    this.handleUploadPic = this.handleUploadPic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    pictureIds: this.props.elementData.ids,
    canShow: false,
    locationActive: true,
    pictureModal: false,
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
    const newIds = this.state.pictureIds ? this.state.pictureIds : [];
    newIds.push(id);
    this.setState({
      pictureIds: newIds,
      pictureModal: false
    });
    onChange({
      value: { locationActive: this.state.locationActive, ids: newIds },
      name: "content"
    });
  }

  handleChange(reactions) {
    const { onChange } = this.props;
    this.setState({
      pictureIds: reactions.value
    });
    onChange({
      value: {
        locationActive: this.state.locationActive,
        ids: reactions.value
      },
      name: "content"
    });
  }
  render() {
    const { axios } = this.props;
    if (this.state.canShow)
      return (
        <div>
          <MultiSelect
            key={"picture"}
            name={"pictures"}
            onChange={this.handleChange}
            value={this.state.pictureIds}
            options={this.state.pictures}
            isMulti={true}
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
