import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class DropdownSelection extends Component {
  /* props required are: selectedIdx, choices: [{id, callback, title}] */
  state = { selected: this.props.choices[this.props.selectedIdx] };
  render() {
    return (
      <DropdownButton title={this.state.selected.title}>
        {this.props.choices.map(choice => (
          <Dropdown.Item
            key={choice.id}
            onClick={() => {
              this.setState({ selected: choice });
              if (this.props.generalCallback) {
                this.props.generalCallback(choice);
              } else {
                choice.callback(choice);
              }
            }}
          >
            {choice.title}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
}

export default DropdownSelection;
