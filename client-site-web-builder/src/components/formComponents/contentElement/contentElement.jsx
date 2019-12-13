import React from "react";
import StandardElement from "./../standardElement";
import ButtonElement from "./buttonElement";

export default function ContentElement(props) {
  const { type, onChange, element, elementData } = props;
  switch (type) {
    case "text":
      element.formType = "textarea";
      return (
        <StandardElement
          element={element}
          value={elementData.text}
          onChange={target =>
            onChange({ value: { text: target.value }, name: target.name })
          }
        />
      );
    case "button":
      return <ButtonElement {...props} />;
    case "container":
      return;
    default:
      return <h1>Incorrect type</h1>;
  }
}
