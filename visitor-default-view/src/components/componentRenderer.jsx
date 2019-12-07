import React, { Component } from "react";
import { Converter } from "showdown";

import examples from "./exampleObjects";
const { exampleComponent } = examples;

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
    const component = exampleComponent; // axios call
    this.setState({ ...component });
  };

  // "carrousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
  render() {
    const { type, content } = this.state;
    switch (type) {
      case "text":
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: this.markdownConverter.makeHtml(content)
            }}
          ></div> // This requires a notification to be pushed to the admin!
        );
      default:
        return <h1>Component with ID: {this.props.id}</h1>;
    }
  }
}

export default ComponentRenderer;
