import React, { Component } from "react";
import { Converter } from "showdown";
import { Button } from "react-bootstrap";
import PictureFolder from "./pictureFolder.jsx";
import WoxCarousel from "./woxComponents/carrousel";

import examples from "./exampleObjects";
const { fetchComponent } = examples;

class ComponentRenderer extends Component {
  markdownConverter = new Converter();
  state = {};

  componentDidMount = () => {
    const component = fetchComponent(this.props.id); // axios call
    this.setState({ ...component });
  };

  // Inserting html poses a security risk, however only the admin has these rights!
  renderText = content => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.markdownConverter.makeHtml(content)
        }}
      ></div>
    );
  };

  renderCarrousel = content => {
    return <WoxCarousel content={content} />;
  };
  renderContainer = content => {
    return <h1>Container Placeholder</h1>;
  };
  renderGeneral = content => {
    return <h1>General Placeholder</h1>;
  };
  renderButton = content => {
    return <Button href={content.link}>{content.text}</Button>;
  };
  renderClickablePicture = content => {
    return (
      <a href={content.link}>
        <img
          src={content.online ? content.source : content.id}
          alt={content.alt} // should get fetched from the database
        ></img>
      </a>
    );
  };

  handlers = {
    text: this.renderText,
    carrousel: this.renderCarrousel,
    container: this.renderContainer,
    general: this.renderGeneral,
    button: this.renderButton,
    clickablePicture: this.renderClickablePicture,
    pictureFolder: c => <PictureFolder content={c} />
  };

  //
  render() {
    const { type, content } = this.state;
    const handler = this.handlers[type];
    if (type && handler) {
      return handler(type);
    }
    return (
      <h3 style={{ color: "red" }}>
        Error: unsuported component, please check component [{this.props.id}]
      </h3>
    );
  }

  //
  render() {
    const { type, content } = this.state;
    const handler = this.handlers[type];
    if (type && handler) {
      return handler(content);
    }
    return (
      <h3 style={{ color: "red" }}>
        Error: please check component [{this.props.id}]
      </h3>
    );
  }
}

export default ComponentRenderer;
