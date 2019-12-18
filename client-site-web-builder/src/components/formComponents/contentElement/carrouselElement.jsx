import React, { Component } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import PictureUpload from "./../importPicture/pictureUpload";

export default class CarrouselElement extends Component {
  render() {
    return (
      <OverlayTrigger
        trigger="click"
        key="poppie"
        placement="right"
        overlay={
          <Popover id="poppie">
            <Popover.Title as="h3">Insert new Image</Popover.Title>
            <Popover.Content>
              <PictureUpload axios={this.props.axios} />
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="secondary">Popover on </Button>
      </OverlayTrigger>
    );
  }
}
