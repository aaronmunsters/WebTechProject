import React, { Component } from "react";
import { Converter } from "showdown";
import { Button } from "react-bootstrap";
import PictureFolder from "./pictureFolder.jsx";
import WoxCarousel from "./woxComponents/carrousel";
import "./galeryStyle.css";

import examples from "./exampleObjects";
const { fetchComponent } = examples;

class ComponentRenderer extends Component {
  markdownConverter = new Converter();
  /*
  const exampleComponent = {
    id: 496843235,
    author: "WoxPace",
    title: "Welcome-text",
    tags: ["text", "welcome"],
    type: "text", // "carrousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
    content: "Hello world!",
    pages: [123, 456, 798],
    data: "07-12-2019"
  };
*/

  state = {};

  componentDidMount = () => {
    const component = fetchComponent(this.props.id); // axios call
    this.setState({ ...component });
  };

  renderText = content => {
    return (
      /*
      This requires a notification to be pushed to the admin!
        However, this is a safe operation for as long as only the
        admin is possible to post text content.
      */
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

  //
  render() {
    const { type, content } = this.state;
    switch (type) {
      case "text":
        return this.renderText(content);
      case "carrousel":
        return this.renderCarrousel(content);
      case "container":
        return this.renderContainer(content);
      case "general":
        return this.renderGeneral(content);
      case "button":
        return this.renderButton(content);
      case "clickablePicture":
        return this.renderClickablePicture(content);
      case "pictureFolder":
        return <PictureFolder content={content} />;
      default:
        return (
          <h3 style={{ color: "red" }}>
            Error: unsuported component, please check component [{this.props.id}
            ]
          </h3>
        );
    }
  }
}

export default ComponentRenderer;
