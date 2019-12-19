import React, { Component } from "react";
import { getApiObject } from "./../generalFunctions";

const fakePicture = {
  caption: "Mountains",
  src: "https://picsum.photos/id/1015/6000/4000",
  small: "https://picsum.photos/id/1015/600/400",
  width: 6,
  height: 4,
  location: [41.505, -0.09]
};

class CliclablePictureRenderer extends Component {
  state = {
    caption: null,
    src: null,
    small: null,
    width: null,
    height: null,
    location: null
  };

  updatePicture = async () => {
    let image = await getApiObject("image", this.props.id);
    if (!image) image = fakePicture; // get's removed when pictures can be inserted
    this.setState({ ...image, src: image.filepath });
  };

  componentDidMount = async () => {
    await this.updatePicture();
  };

  render() {
    const { caption, src } = this.state;
    if (!src) return null; // picture not loaded yet
    return (
      <a href={this.props.content.link}>
        <img src={src} alt={caption}></img>
      </a>
    );
  }
}

export default CliclablePictureRenderer;
