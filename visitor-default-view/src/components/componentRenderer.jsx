import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PictureFolder from "./pictureFolder.jsx";
import WoxCarousel from "./woxComponents/carrousel";
import ErrorLog from "./errorLog.jsx";
import TextRenderer from "./textRenderer.jsx";
import ContainerRenderer from "./containerRenderer.jsx";
import ClickablePicture from "./clickablePictureRenderer.jsx";
import { parseProps, getApiObject } from "./generalFunctions";

class ComponentRenderer extends Component {
  state = {};
  id = this.props.id;

  componentDidMount = async () => {
    const component = await getApiObject("component", this.id);
    const propsToParse = ["content", "pages", "tags"];
    parseProps(component, propsToParse);
    this.setState({ ...component });
  };

  handlers = {
    text: c => <TextRenderer content={c} />,
    carrousel: c => <WoxCarousel content={c} />,
    container: c => <ContainerRenderer content={c} parent={this.id} />,
    button: c => <Button href={c.link}>{c.text}</Button>,
    clickablePicture: c => <ClickablePicture content={c} />,
    pictureFolder: c => <PictureFolder content={c} />
  };

  render() {
    const { type, content } = this.state;
    const handler = this.handlers[type];
    if (!type) return null;
    if (type && handler) return handler(content);
    else
      return (
        <ErrorLog
          statement={"Unknown component: " + type}
          details={"Component id: " + this.id}
          severity={3}
        />
      );
  }
}

export default ComponentRenderer;
