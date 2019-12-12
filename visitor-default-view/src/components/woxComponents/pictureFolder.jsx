import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Col from "react-bootstrap/Col";
import { getApiObject } from "../generalFunctions";
import { Map, TileLayer } from "react-leaflet";

class PictureFolder extends Component {
  state = {
    currentImage: 0,
    viewerIsOpen: false,
    images: false,
    invalidImages: false
  };

  componentDidMount = () => {
    const { ids } = this.props.content;
    const images = ids.map(id => getApiObject("image", id));
    const invalidIdx = [];
    Promise.all(images).then(images => {
      images = images
        // filter out invalid images, which are "", we handle this as a negative boolean
        .filter((res, idx) => {
          if (!res) invalidIdx.push(idx);
          return !!res;
        })
        // make database object compatible
        .map(i => ({
          caption: i.title,
          src: i.filepath,
          height: 25,
          width: 33
        }));
      this.setState({ images: images, invalidImages: invalidIdx });
    });
  };

  openLightbox = (event, { photo, index }) => {
    this.setState({ currentImage: index, viewerIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ currentImage: 0, viewerIsOpen: false });
  };

  render() {
    let { images } = this.state;
    if (!images) return null;
    // to render thumbnails
    const thumbnails = images.map(i => ({ ...i, src: i.small }));

    // to render the map
    const position = [51.505, -0.09];
    const leafletMap = (
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );

    return (
      <Col>
        <Gallery photos={images /*thumbnails*/} onClick={this.openLightbox} />
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel currentIndex={this.state.currentImage} views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </Col>
    );
  }
}

export default PictureFolder;
