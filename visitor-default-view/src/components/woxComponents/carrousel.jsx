import React, { Component } from "react";
import Carousel from "react-images";
import { Badge } from "react-bootstrap";
import { getApiObject } from "./../generalFunctions";

const exampleCarrouselComponent = {
  captionActive: true, // when true: renders captions below each picture
  customCaption: true, // when true: renders custom caption (provided by 'captions') per picture
  singleCaption: false, // when true: first caption of 'captions' will be permanent across all captions
  ids: ["pic-id-1", "pic-id-2"],
  captions: ["custom-caption-id-1", "custom-caption-id-2"]
};

function updateImages(images) {
  images.push({
    caption: "Mountains",
    src: "https://picsum.photos/id/1015/6000/4000",
    small: "https://picsum.photos/id/1015/600/400",
    width: 6,
    height: 4,
    location: [41.505, -0.09]
  });
  images.push({
    caption: "Warm looking picture",
    src: "https://picsum.photos/id/1016/3844/2563",
    small: "https://picsum.photos/id/1016/38/25",
    width: 3844,
    height: 2563,
    location: [21.505, -0.09]
  });
  images.push({
    caption: "Blindfold",
    src: "https://picsum.photos/id/1014/6016/4000",
    small: "https://picsum.photos/id/1014/60/40",
    width: 6016,
    height: 4000,
    location: [51.505, -0.09]
  });
  return images;
}

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
        .map(i => ({ ...i }));
      images = updateImages(images);
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
