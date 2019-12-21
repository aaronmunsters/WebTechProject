import React, { Component } from "react";
import PictureUpload from "./pictureUpload";
import MultiSelect from "./../multiSelect";
import { Form } from "react-bootstrap";

export default class PictureInsert extends Component {
  constructor(props) {
    super(props);
    this.handleUploadPic = this.handleUploadPic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    pictureIds: this.props.elementData.ids,
    canShow: false,
    pictures: []
  };

  componentDidMount = async () => {
    const { elementData } = this.props;
    this.setState({
      pictureIds: elementData.ids,
      pictures: await this.fetchPictures(),
      canShow: true
    });
  };

  componentDidUpdate = async nextProps => {
    const { elementData } = this.props;
    if (nextProps.elementData !== elementData) {
      this.setState({
        pictureIds: elementData.ids,
        pictures: await this.fetchPictures()
      });
    }
  };
  fetchPictures = async () => {
    const { axios } = this.props;
    let pics = await axios.ConnectWithDatabase("get", "image", {
      col_filter: ["title", "id"]
    });
    pics = pics.data.map(picture => {
      return { label: picture.title, value: picture.id };
    });
    return pics;
  };

  handleUploadPic(id) {
    const { onAddPicture, isMulti } = this.props;
    const newIds = this.state.pictureIds ? this.state.pictureIds : [];
    if (isMulti) newIds.push(id);
    onAddPicture(newIds);
  }

  handleChange(reactions) {
    const { onAddPicture } = this.props;
    this.setState({
      pictureIds: reactions.value
    });
    onAddPicture(reactions.value);
  }
  render() {
    const { axios } = this.props;
    if (this.state.canShow) {
      return (
        <div>
          <Form.Label>Insert Picture</Form.Label>
          <MultiSelect
            key={"picture"}
            name={"pictures"}
            onChange={this.handleChange}
            value={this.state.pictureIds}
            options={this.state.pictures}
            isMulti={this.props.isMulti}
          />
          <PictureUpload onUpload={this.handleUploadPic} axios={axios} />
        </div>
      );
    } else return null;
  }
}
