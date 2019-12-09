import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PictureFolder from "./pictureFolder.jsx";
import WoxCarousel from "./woxComponents/carrousel";
import ErrorLog from "./errorLog.jsx";
import TextRenderer from "./textRenderer.jsx";
import ContainerRenderer from "./containerRenderer.jsx";
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

    const component = (await axios.get(getComponentURL)).data; //fetchComponent(this.props.id); // axios call
    Object.keys(component).forEach(omzetter(component));
    this.setState({ ...component });
  };

  renderGeneral = content => {
    return <h1>General Placeholder</h1>;
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
    text: c => <TextRenderer content={c} />,
    carrousel: c => <WoxCarousel content={c} />,
    container: c => <ContainerRenderer content={c} parent={this.id} />,
    general: this.renderGeneral,
    button: c => <Button href={c.link}>{c.text}</Button>,
    clickablePicture: this.renderClickablePicture,
    pictureFolder: c => <PictureFolder content={c} />
  };

  render() {
    const { type, content } = this.state;
    const handler = this.handlers[type];
    if (type && handler) {
      return handler(content);
    }
    return (
      <ErrorLog
        main={"Unknown component"}
        det={"Component id: " + this.props.id}
        severity={3}
      />
    );
  }
}

export default ComponentRenderer;
