import React, { Component } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";
import MultiSelect from "./multiSelect";
import WoxComponents from "./woxComponents/woxComponents";
import ColorPicker from "./colorPicker/colorPicker";
import StandardElement from "./standardElement";
import ContentElement from "./contentElement/contentElement";
import PictureInsert from "./importPicture/pictureInsert";

export default class FormElement extends Component {
  /* ------------------------------------------------------------------
  gets the value responding to the elment given. Usualy this just means
  giving back the element from data, but whene the data is an object, 
  the correct attribute of the objects needs to be given back
  -------------------------------------------------------------------*/
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

  /* ------------------------------------------------------------------
  fetches the correct form Element. This procedure checks if the element
  hase some special properties, and if so gives back the correct formElement
  when it is no special case, it gives back a standardElement. More in
  detail about every element in its corresponding file
  -------------------------------------------------------------------*/
  getCorrectElement() {
    const { group, element, ...rest } = this.props;
    const { lists, onChange, data, axios } = rest;
    if (element.key === "backgroundColor") {
      return (
        <ColorPicker
          key={element.label}
          onChange={onChange}
          color={data[element.key]}
        />
      );
    } else if (element.key === "url") {
      /* ------------------------------------------------------------------
      the URL doesn't have its own special Element, but this needs to get
      prepended by the already existing URL.
      -------------------------------------------------------------------*/
      return (
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              {new URL(document.URL).origin + "/"}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <StandardElement
            key={element.label}
            element={element}
            value={this.getvalue(element)}
            onChange={onChange}
          />
        </InputGroup>
      );
    } else if (element.key === "comps") {
      /* ------------------------------------------------------------------
      we search in the layouts list for the correct layout. Here we take
      the column type to give this to the WoxComponents to know how many
      columns it has to display
      -------------------------------------------------------------------*/
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
          key={element.label}
          axios={axios}
          element={element}
          woxComponents={lists.woxComponents}
          elementData={data[element.key]}
          type={data.type}
          onChange={onChange}
        />
      );
    } else if (element.formType.includes("select")) {
      /* ------------------------------------------------------------------
      we check if the options are already given in array form or not, when
      they are not, the string that is given to the element.options is the
      key for in the lists so we know what list we have to use. It has to
      be mapped becuse its not in the correct format for the MultiSelect to use
      -------------------------------------------------------------------*/
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
    } else if (element.formType === "picture") {
      return (
        <PictureInsert
          isMulti={false}
          onAddPicture={newId => onChange({ name: element.key, value: newId })}
          elementData={{ ids: data[element.key] }}
          axios={axios}
        />
      );
    } else {
      return (
        <StandardElement
          key={element.label}
          element={element}
          value={this.getvalue(element)}
          onChange={onChange}
        />
      );
    }
  }
  render() {
    const { group, element, ...rest } = this.props;
    if (element.group) {
      /* ------------------------------------------------------------------
      when the element is group, it will render al its children in columns
      instead of rows.
      -------------------------------------------------------------------*/
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
          {element.label ? <Form.Label>{element.label}</Form.Label> : null}
          {this.getCorrectElement()}
        </Form.Group>
      );
  }
}
