import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { getApiObject } from "../generalFunctions";
import LeafletHover from "./leafletHover";
import { liveUpdate, updateInterval } from "../../defaults.json";

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
        // make database object compatible
        .map(i => ({ ...i }));
      images = updateImages(images);
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
      src: i.small ? i.small : i.src // thumbnail (if exists, else full-size)
    }));

    const customFooter = ({ innerProps, currentIndex }) => {
      return this.props.content.locationActive ? (
        <LeafletHover
          caption={images[currentIndex].caption}
          location={images[currentIndex].location}
        ></LeafletHover>
      ) : null;
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
