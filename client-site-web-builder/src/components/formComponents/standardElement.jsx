import React from "react";
import { Form, Col } from "react-bootstrap";

export default function StandardElement(props) {
  const { group, element, value, lists, onChange } = props;
  return (
    <Form.Group
      key={element.key}
      as={group ? Col : undefined}
      md={group ? element.mdSize : 12}
    >
      <Form.Label>{element.label}</Form.Label>
      <Form.Control
        required
        disabled={element.disabled ? true : false}
        multiple={element.formType === "multipleselect" ? true : false}
        as={
          element.formType.includes("select")
            ? "select"
            : element.formType === "textarea"
            ? "textarea"
            : undefined
        }
        type={element.inputType}
        name={element.key}
        placeholder={element.label}
        onChange={event => onChange(event.currentTarget)}
        key={element.key}
        defaultValue={value}
      >
        {Array.isArray(element.options)
          ? element.options.map(option => {
              return (
                <option value={option.value} key={option.value}>
                  {option.title}
                </option>
              );
            })
          : element.options
          ? lists[element.options].map(option => {
              return (
                <option value={option.id} key={option.id}>
                  {option.title}
                </option>
              );
            })
          : null}
      </Form.Control>
    </Form.Group>
  );
}
