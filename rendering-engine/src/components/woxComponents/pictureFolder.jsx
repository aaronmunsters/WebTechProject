import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {
  getApiObject,
  requestUpdate,
  stopRequestUpdate
} from "../generalFunctions";
import LeafletHover from "./leafletHover";
import { liveUpdate } from "../../defaults.json";

class PictureFolder extends Component {
  state = {
    currentImage: 0,
    viewerIsOpen: false,
    images: [],
    invalidImages: false
  };

  updatePictures = async () => {
    const { ids } = this.props.content;
    if (!ids) return null; // No pictures provided
    const images = ids.map(id => getApiObject("image", id));
    const invalidIdx = [];
    Promise.all(images).then(images => {
      images = images
        // filter out invalid images, which are "", handled as a negative boolean
        .filter((res, idx) => {
          if (!res) invalidIdx.push(idx);
          return !!res;
        })
        .filter(res => {
          return res.id;
        })
        // make database object compatible
        .map(i => ({ ...i }));
      this.setState({ images: images, invalidImages: invalidIdx });
    });
  };

  componentDidMount = async () => {
    await this.updatePictures();
    if (liveUpdate) requestUpdate(this, this.updatePictures);
  };

  componentWillUnmount() {
    if (liveUpdate) stopRequestUpdate(this);
  }

  openLightbox = (event, { photo, index }) => {
    this.setState({ currentImage: index, viewerIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ currentImage: 0, viewerIsOpen: false });
  };

  render = () => {
    let { images } = this.state;
    if (!images) return null;

    const thumbnails = images.map(i => ({
      ...i, // other properties of the image
      src: i.compressed_src ? i.compressed_src : i.src // thumbnail (if exists, else full-size)
    }));

    const customFooter = ({ innerProps, currentIndex }) => {
      if (!this.props.content.locationActive) return null;
      const lat = images[currentIndex].lat;
      const long = images[currentIndex].long;
      // only provide location when it's specified
      const imgLocation = lat && long ? [lat, long] : null;
      return (
        <LeafletHover
          caption={images[currentIndex].title}
          location={imgLocation}
        ></LeafletHover>
      );
    };

    return (
      <div>
        <Gallery photos={thumbnails} onClick={this.openLightbox} />
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel
                currentIndex={this.state.currentImage}
                views={images}
                components={{
                  Footer: customFooter
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  };
}

export default PictureFolder;
