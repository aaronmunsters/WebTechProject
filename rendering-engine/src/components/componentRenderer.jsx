import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import {
  parseProps,
  getApiObject,
  requestUpdate,
  stopRequestUpdate
} from "./generalFunctions";
import ErrorLog from "./errorLog.jsx";
import { ComponentParseProps, liveUpdate } from "../defaults.json";

import PictureFolder from "./woxComponents/pictureFolder";
import WoxCarousel from "./woxComponents/carousel";
import TextRenderer from "./woxComponents/textRenderer.jsx";
import ContainerRenderer from "./woxComponents/containerRenderer";
import ClickablePicture from "./woxComponents/clickablePictureRenderer";
import CommentingRenderer from "./woxComponents/commenting";

class ComponentRenderer extends Component {
  state = {};
  id = this.props.id;

  updateComponent = async () => {
    const component = await getApiObject("component", this.id);
    if (component) parseProps(component, ComponentParseProps);
    this.setState(component);
  };

  componentDidMount = async () => {
    await this.updateComponent();
    if (liveUpdate) requestUpdate(this, this.updateComponent);
  };

  componentWillUnmount = async () => {
    if (liveUpdate) stopRequestUpdate(this);
  };

  handleReply = async () => {
    await this.updateComponent();
  };

  handlers = {
    text: c => <TextRenderer content={c} />,
    carousel: c => <WoxCarousel content={c} />,
    container: c => <ContainerRenderer content={c} parent={this.id} />,
    button: c => <Button href={c.link}>{c.text}</Button>,
    clickablePicture: c => <ClickablePicture content={c} />,
    pictureFolder: c => <PictureFolder content={c} />
  };

  render() {
    const { type, content, commentable } = this.state;
    const handler = this.handlers[type];
    if (type && handler) {
      const comments = commentable ? (
        <CommentingRenderer {...this.state} handleReply={this.handleReply} />
      ) : null;
      return (
        <Col key={this.id}>
          {handler(content)}
          {comments}
        </Col>
      );
    } else
      return (
        <ErrorLog
          statement={"Unknown component"}
          details={"Component id: " + this.id}
          severity={3}
        />
      );
  }
}

export default ComponentRenderer;
