import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PictureFolder from "./pictureFolder.jsx";
import WoxCarousel from "./woxComponents/carrousel";
import ErrorLog from "./errorLog.jsx";
import TextRenderer from "./textRenderer.jsx";
import ContainerRenderer from "./containerRenderer.jsx";
import ClickablePicture from "./clickablePictureRenderer.jsx";
import {
  hostname,
  port,
  apiLocation,
  componentLocation
} from "../defaults.json";
import axios from "axios";

class ComponentRenderer extends Component {
  state = {};
  id = this.props.id;

  componentDidMount = async () => {
    const getComponentURL = // eg.: http://localhost:3001/api/layout/123456789
      "http://" +
      hostname +
      port +
      apiLocation +
      componentLocation +
      this.props.id;

    const omzetter = object => {
      const mapF = key => {
        if (key === "content" || key === "pages" || key === "tags") {
          object[key] = JSON.parse(object[key]);
        }
      };
      return mapF;
    };

    const component = (await axios.get(getComponentURL)).data;
    Object.keys(component).forEach(omzetter(component));
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
          main={"Unknown component: " + type}
          det={"Component id: " + this.id}
          severity={3}
        />
      );
  }
}

export default ComponentRenderer;
