import React, { Component } from "react";
import Carousel from "react-images";

class WoxCarousel extends Component {
  componentDidMount() {
    this.setState({
      locations: this.props.content.locations,
      views: this.props.content.sources.map((s, i) => ({
        source: s,
        caption: this.props.content.singleCaption
          ? this.props.content.captions[0]
          : this.props.content.captions[i],
        location: this.props.content.singleLocation
          ? this.props.content.locations[0]
          : this.props.content.locations[i]
      }))
    });
  }

  customStyles = {
    header: (base, state) => ({
      ...base,
      borderBottom: "1px dotted pink",
      color: state.isFullscreen ? "red" : "blue",
      padding: 20
    }),
    view: () => ({
      // none of react-images styles are passed to <View />
      height: 400,
      width: 600
    }),
    footer: (base, state) => {
      const opacity = state.interactionIsIdle ? 0 : 1;
      const transition = "opacity 300ms";

      return { ...base, opacity, transition };
    }
  };

  // To redner the location of the event, we include a custom footer
  CurstomFooter = ({ innerProps, currentIndex }) => {
    // Do some stuff
    return this.props.content.locations[currentIndex];
  };

  state = {};
  render() {
    const { views } = this.state;
    return views ? (
      <Carousel views={views} components={{ Footer: this.CurstomFooter }} />
    ) : null;
  }
}

export default WoxCarousel;
