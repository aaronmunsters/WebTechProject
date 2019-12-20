import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { getApiObject } from "../generalFunctions";
import LeafletHover from "./leafletHover";
import { liveUpdate, updateInterval } from "../../defaults.json";

class PictureFolder extends Component {
  state = {
    currentImage: 0,
    viewerIsOpen: false,
    images: false,
    invalidImages: false
  };

  updatePictures = async () => {
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
        .filter(res => {
          return res.id;
        })
        // make database object compatible
        .map(i => ({ ...i }));
      this.setState({ images: images, invalidImages: invalidIdx });
    });
  };

  awaitUpdate(callback) {
    return async () => {
      if (this.prevUpdateDone) {
        this.prevUpdateDone = false;
        await callback();
        this.prevUpdateDone = true;
      }
    };
  }

  componentDidMount = async () => {
    await this.updatePictures();
    this.prevUpdateDone = true;
    if (liveUpdate)
      this.interval = setInterval(
        this.awaitUpdate(this.updatePictures),
        updateInterval
      );
  };

  componentWillUnmount = async () => {
    if (liveUpdate) clearInterval(this.interval);
  };

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
      const imgLocation = [images[currentIndex].lat, images[currentIndex].long];
      return (
        <LeafletHover
          caption={images[currentIndex].caption}
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
