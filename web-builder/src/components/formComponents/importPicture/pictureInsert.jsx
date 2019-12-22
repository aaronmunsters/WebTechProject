import React, { Component } from "react";
import PictureUpload from "./pictureUpload";
import MultiSelect from "./../multiSelect";
import { Form } from "react-bootstrap";

/* ------------------------------------------------------------------
Since multiple components need a way to insert pictures this is a
wrapper around all the important functions needed to let pictureUpload
function smoothly (and show the ids correctly). Currently though there
is no way for a picture to be removed from the database. This is for
a future project.
-------------------------------------------------------------------*/
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

  /* ------------------------------------------------------------------
  we first fetch the already existing pictures so we don't actually have
  to upload a picture if its already in the database.
  -------------------------------------------------------------------*/
  componentDidMount = async () => {
    const { elementData } = this.props;
    this.setState({
      pictureIds: elementData.ids,
      pictures: await this.fetchPictures(),
      canShow: true
    });
  };

  /* ------------------------------------------------------------------
  everytime we have a pictureId added to our elementData(by upload or not),
  we want to refetch all the pictures from the database 
  -------------------------------------------------------------------*/
  componentDidUpdate = async nextProps => {
    const { elementData } = this.props;
    if (nextProps.elementData !== elementData) {
      this.setState({
        pictureIds: elementData.ids,
        pictures: await this.fetchPictures()
      });
    }
  };

  /* ------------------------------------------------------------------
  the actual procedure to fetch the pictures from the database.
  -------------------------------------------------------------------*/
  fetchPictures = async () => {
    const { axios } = this.props;
    let pics = await axios.ConnectWithDatabase("get", "image", {
      col_filter: ["title", "id"]
    });
    pics = pics.map(picture => {
      return { label: picture.title, value: picture.id };
    });
    return pics;
  };

  /* ------------------------------------------------------------------
  when a picture is uploaded we want it to be added to the id list
  -------------------------------------------------------------------*/
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
