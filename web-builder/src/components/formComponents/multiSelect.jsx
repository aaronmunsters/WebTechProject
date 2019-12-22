import React, { Component } from "react";
import Select from "react-select";

/* ------------------------------------------------------------------
React-bootstrap doesn't have the option to have multiple options
selected in a select. Herefor we use an external library called
react-select for all selections.
-------------------------------------------------------------------*/
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

  /* ------------------------------------------------------------------
  when something is changed, we have to check whether it is a multi
  selection component or not. Because when it is. we have to map over it
  before handing it back to its parent.
  -------------------------------------------------------------------*/
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
