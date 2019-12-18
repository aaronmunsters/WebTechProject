import React, { Component } from "react";
import PictureUpload from "./../importPicture/pictureUpload";
import MultiSelect from "./../multiSelect";
import { Form, Button } from "react-bootstrap";

export default class PictureFolderElement extends Component {
  constructor(props) {
    super(props);
    this.handleUploadPic = this.handleUploadPic.bind(this);
  }
  state = {
    pictureIds: [],
    locationActive: true,
    pictureModal: false,
    pictures: []
  };

  componentDidMount = async () => {
    const { axios } = this.props;
    let pics = await axios.ConnectWithDatabase("get", "image", {
      col_filter: ["title", "id"]
    });
    this.setState({ pictures: pics });
  };

  handleUploadPic(id) {
    const { onChange } = this.props;
    const newIds = this.state.pictureIds;
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

  render() {
    const { axios } = this.props;
    return (
      <Form.Row>
        <MultiSelect
          key={"picture"}
          name={"pictures"}
          onChange={() => {}}
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
      </Form.Row>
    );
  }
}
