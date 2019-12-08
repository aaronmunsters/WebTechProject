import React, { Component } from "react";
import { Converter } from "showdown";
import { Button } from "react-bootstrap";

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
      <div
        dangerouslySetInnerHTML={{
          __html: this.markdownConverter.makeHtml(content)
        }}
      ></div> // This requires a notification to be pushed to the admin!
    );
  };

  renderCarrousel = content => {
    return <h1>Carrousel Placeholder</h1>;
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
    return <h1>ClickablePicture Placeholder</h1>;
  };
  renderPictureFolder = content => {
    return <h1>PictureFolder Placeholder</h1>;
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
        return this.renderPictureFolder(content);
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
