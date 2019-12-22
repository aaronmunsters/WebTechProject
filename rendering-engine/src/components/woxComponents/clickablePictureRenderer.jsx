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
    let image = await getApiObject("image", this.props.content.id);
    this.setState({ ...image });
  };

  componentDidMount = async () => {
    await this.updatePicture();
  };

  render() {
    console.log(this.props.content.id);
    const { caption, src } = this.state;
    if (!src) return null; // picture not loaded yet or invalid id
    return (
      <a href={this.props.content.link}>
        <img src={src} alt={caption}></img>
      </a>
    );
  }
}

export default CliclablePictureRenderer;
