import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Col from "react-bootstrap/Col";
import { getApiObject } from "../generalFunctions";

const photos = [
  {
    title: "hello world!",
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3
  }
];

class PictureFolder extends Component {
  state = {
    currentImage: 0,
    viewerIsOpen: false,
    images: false,
    invalidImages: false
  };

  componentDidMount = () => {
    const { ids } = this.props.content;
    ids.push("ffb057c0-1d1f-11ea-83e1-ffb25f078cad"); // should be removed
    const images = ids.map(id => getApiObject("image", id));
    const invalidIdx = [];
    Promise.all(images).then(images => {
      images = images.filter((res, idx) => {
        // as server response for invalid images is "", we handle this as a negative boolean
        if (!res) invalidIdx.push(idx);
        return !!res;
      });
      this.setState({ images: images, invalidImages: invalidIdx });
    });
  };

  openLightbox = (event, { photo, index }) => {
    this.setState({ currentImage: index });
    this.setState({ viewerIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ currentImage: 0 });
    this.setState({ viewerIsOpen: false });
  };

  render() {
    if (!this.state.images) return null;
    const { images } = this.state;
    const cImages = images.map(i => ({
      ...i,
      height: 250,
      src: i.filepath,
      width: 330
    }));
    const views = photos.map(x => ({
      ...x,
      srcset: x.srcSet,
      caption: x.title
    }));

    const nviews = this.state.images.map(i => ({
      ...i,
      width: 1,
      height: 1,
      srcset: i.filepath,
      caption: i.title
    }));
    console.log(cImages);
    return (
      <Col style={{ width: "100%", padding: "0px" }}>
        <Gallery photos={cImages} onClick={this.openLightbox} />
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel currentIndex={this.state.currentImage} views={nviews} />
            </Modal>
          ) : null}
        </ModalGateway>
      </Col>
    );
  }
}

export default PictureFolder;
