import React from "react";
import { Form } from "react-bootstrap";

export default function StandardElement(props) {
  const { element, value, lists, onChange } = props;
  return (
    <Form.Control
      required
      disabled={element.disabled ? true : false}
      as={
        element.formType === "select"
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
                {option.label}
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
  );
}
