import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import { parseProps, getApiObject } from "./generalFunctions";
import ErrorLog from "./errorLog.jsx";
import { ComponentParseProps } from "../defaults.json";

import PictureFolder from "./woxComponents/pictureFolder";
import WoxCarousel from "./woxComponents/carrousel";
import TextRenderer from "./woxComponents/textRenderer.jsx";
import ContainerRenderer from "./woxComponents/containerRenderer";
import ClickablePicture from "./woxComponents/clickablePictureRenderer";
import CommentingRenderer from "./woxComponents/commenting";

class ComponentRenderer extends Component {
  state = {};
  id = this.props.id;

  componentDidMount = async () => {
    const component = await getApiObject("component", this.id);
    if (component) parseProps(component, ComponentParseProps);
    this.setState(component);
  };

  async handleReply() {
    const component = await getApiObject("component", this.id);
    if (component) parseProps(component, ComponentParseProps);
    this.setState({ ...component });
  }

  handlers = {
    text: c => <TextRenderer content={c} />,
    carrousel: c => <WoxCarousel content={c} />,
    container: c => <ContainerRenderer content={c} parent={this.id} />,
    button: c => <Button href={c.link}>{c.text}</Button>,
    clickablePicture: c => <ClickablePicture content={c} />,
    pictureFolder: c => <PictureFolder content={c} />
  };

  render() {
    const { type, content, commentable } = this.state;
    const handler = this.handlers[type];
    if (type && handler)
      return (
        <Col key={this.id}>
          {handler(content)}
          {commentable ? (
            <CommentingRenderer
              {...this.state}
              handleReply={this.handleReply}
            />
          ) : null}
        </Col>
      );
    else
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
