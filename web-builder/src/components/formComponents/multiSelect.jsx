import React, { Component } from "react";
import Select from "react-select";

export default class MultiSelect extends Component {
  state = {
    myData: this.props.options,
    defaultValue: this.props.value
  };
  componentDidUpdate(nextProps) {
    const { options, value } = this.props;
    if (nextProps !== this.props) {
      this.setState({ myData: options, defaultValue: value });
    }
  }
  handleChange = event => {
    const { isMulti, name, onChange } = this.props;
    let value = event && event.value !== undefined ? event.value : event;
    if (isMulti && event) value = value.map(option => option.value);
    onChange({ value: value, name: name });
  };
  findDefault = value => {
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
        value={this.findDefault(this.state.defaultValue)}
        onChange={this.handleChange}
        options={this.state.myData}
        multiple
      />
    );
  }
}
