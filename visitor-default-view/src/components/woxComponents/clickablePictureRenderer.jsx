import React, { Component } from "react";
import { getApiObject } from "./../generalFunctions";

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
    const image = getApiObject("image", this.props.id);
    this.setState({ ...image });
  };

  componentDidMount = async () => {
    await this.updatePicture();
  };

  render() {
    const { caption, src } = this.state;
    if (!src) return null; // picture not loaded yet
    return (
      <a href={this.props.content.link}>
        <img style={{ borderRadius: "50%" }} src={src} alt={caption}></img>
      </a>
    );
  }
}

export default CliclablePictureRenderer;
