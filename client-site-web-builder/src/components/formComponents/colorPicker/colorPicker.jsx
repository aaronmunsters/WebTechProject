import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { OverlayTrigger, Popover } from "react-bootstrap";

export default class ColorPicker extends Component {
  state = {
    color: { r: 50, g: 50, b: 50, a: 1 }
  };
  getStyle = () => ({
    width: "20%",
    height: "38px",
    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
    border: "1px solid #ced4da",
    borderRadius: "5px",
    marginTop: "32px"
  });

  handleChangeComplete = color => {
    this.setState({ color: color.rgb });
    console.log(color.rgb);
    let value = `rgb(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b})`;

    this.props.onChange({ value: value, name: "backgroundColor" });
  };

  render() {
    return (
      <OverlayTrigger
        rootClose
        trigger="click"
        key="test"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned`}>
            <Popover.Title as="h3">Choose Color</Popover.Title>
            <Popover.Content>
              <SketchPicker
                disableAlpha
                color={this.state.color}
                onChangeComplete={this.handleChangeComplete}
                presetColors={[
                  "#f44336",
                  "#e91e63",
                  "#9c27b0",
                  "#673ab7",
                  "#3f51b5",
                  "#2196f3",
                  "#00bcd4",
                  "#009688",
                  "#4caf50",
                  "#8bc34a",
                  "#cddc39",
                  "#ffeb3b",
                  "#ffc107",
                  "#ff9800",
                  "#ff5722",
                  "#607d8b"
                ]}
              />
            </Popover.Content>
          </Popover>
        }
      >
        <div style={this.getStyle()}></div>
      </OverlayTrigger>
    );
    //return ;
  }
}
