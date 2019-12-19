import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import MultiSelect from "./multiSelect";
import WoxComponents from "./woxComponents/woxComponents";
import ColorPicker from "./colorPicker/colorPicker";
import StandardElement from "./standardElement";
import ContentElement from "./contentElement/contentElement";

export default class FormElement extends Component {
  getvalue(element) {
    const { data } = this.props;
    if (typeof data[element.key] === "object") {
      //special cases:
      if (element.key === "pages") {
        return data[element.key].toString();
      } else if (element.key === "content") {
        return data[element.key].text;
      } else if (element.formType === "multiselect") {
        return data[element.key];
      } else return data[element.key].id;
    } else return data[element.key];
  }
  getCorrectElement() {
    const { group, element, ...rest } = this.props;
    const { lists, onChange, data } = rest;
    if (element.key === "backgroundColor") {
      return (
        <ColorPicker
          key={element.label}
          onChange={onChange}
          color={data[element.key]}
        />
      );
    } else if (element.key === "comps") {
      let layoutTypeValue = "";
      this.props.lists.layouts.map(option => {
        if (option.id === data.layout) layoutTypeValue = option.columnType;
        return null;
      });
      return (
        <WoxComponents
          key={element.label}
          layout={layoutTypeValue}
          compsL={data.compsL}
          compsM={data.compsM}
          compsR={data.compsR}
          woxComponents={lists[element.options]}
          onChange={onChange}
        />
      );
    } else if (element.key === "content") {
      return (
        <ContentElement
          axios={this.props.axios}
          key={element.label}
          element={element}
          woxComponents={lists.woxComponents}
          elementData={data[element.key]}
          type={data.type}
          onChange={onChange}
        />
      );
    } else if (element.formType.includes("select")) {
      //When the formtype is a multiple select, we cant use an external library
      //to make this possible
      let options = Array.isArray(element.options)
        ? element.options
        : lists[element.options].map(option => ({
            value: option.id,
            label: option.title
          }));
      return (
        <MultiSelect
          key={element.label}
          name={element.key}
          onChange={onChange}
          value={this.getvalue(element)}
          options={options}
          isMulti={element.formType === "select" ? false : true}
        />
      );
    } else {
      return (
        <StandardElement
          key={element.label}
          element={element}
          value={this.getvalue(element)}
          lists={lists}
          onChange={onChange}
        />
      );
    }
  }
  render() {
    const { group, element, ...rest } = this.props;
    if (element.group) {
      return (
        <Form.Row key={"Row" + element.groupElements[0].key}>
          {element.groupElements.map(formElement => (
            <FormElement
              key={formElement.key}
              element={formElement}
              group={true}
              {...rest}
            />
          ))}
        </Form.Row>
      );
    } else
      return (
        <Form.Group
          key={element.key}
          as={group ? Col : undefined}
          md={group ? element.mdSize : 12}
        >
          <Form.Label>{element.label}</Form.Label>
          {this.getCorrectElement()}
        </Form.Group>
      );
  }
}
