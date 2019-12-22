import React from "react";
import { Form } from "react-bootstrap";

/* ------------------------------------------------------------------
  Pretty mutch just a regular Form.Control 
  -------------------------------------------------------------------*/
export default function StandardElement(props) {
  const { element, value, onChange } = props;
  return (
    <Form.Control
      required
      disabled={element.disabled ? true : false}
      type={element.inputType}
      name={element.key}
      placeholder={element.label}
      onChange={event => onChange(event.currentTarget)}
      key={element.key}
      defaultValue={value}
    ></Form.Control>
  );
}
