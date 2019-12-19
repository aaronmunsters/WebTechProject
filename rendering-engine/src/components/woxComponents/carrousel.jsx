import React, { Component } from "react";
import Carousel from "react-images";
import { Badge } from "react-bootstrap";
import { getApiObject } from "./../generalFunctions";

class WoxCarousel extends Component {
  state = {};

  componentDidMount = async () => {
    const { ids } = this.props.content;
    const images = ids.map(id => getApiObject("image", id));
    const invalidIdx = [];
    Promise.all(images).then(images => {
      images = images
        // filter out invalid images, which are "", handled as a negative boolean
        .filter((res, idx) => {
          if (!res) invalidIdx.push(idx);
          return !!res;
        })
        // make database object compatible
        .map(i => ({ ...i, source: i.src }));
      this.setState({ images: images, invalidImages: invalidIdx });
    });
  };

  CurstomFooter = ({ currentIndex }) => {
    const { captionActive, customCaption, singleCaption } = this.props.content;
    if (!captionActive) return null;
    const captionIdx = singleCaption ? 0 : currentIndex;
    const caption = customCaption
      ? this.props.content.captions[captionIdx]
      : this.state.images[captionIdx].caption;
    return (
      <h1 style={{ textAlign: "center" }}>
        <Badge variant="dark">{caption}</Badge>
      </h1>
    );
  };

  render() {
    const { images } = this.state;
    return images ? (
      <Carousel views={images} components={{ Footer: this.CurstomFooter }} />
    ) : null;
  }
}

export default WoxCarousel;
