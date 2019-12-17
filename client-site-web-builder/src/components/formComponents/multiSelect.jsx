import React, { Component } from "react";
import Select from "react-select";

export default class MultiSelect extends Component {
  state = {
    myData: this.props.options
  };
  handleChange = event => {
    const { isMulti, name, onChange } = this.props;
    let value = event && event.value !== undefined ? event.value : event;
    if (isMulti && event) value = value.map(option => option.value);
    onChange({ value: value, name: name });
  };
  findDefault = () => {
    const { value } = this.props;
    let result = [];
    const findOne = val =>
      this.state.myData.find(option => option.value === val);
    if (Array.isArray(value)) {
      result = value.map(single => findOne(single));
    } else result = findOne(value);
    return result;
  };
  render() {
    const { isMulti, name } = this.props;
    return (
      <Select
        key={name}
        isMulti={isMulti}
        defaultValue={this.findDefault()}
        onChange={this.handleChange}
        options={this.state.myData}
        multiple
      />
    );
  }
}
