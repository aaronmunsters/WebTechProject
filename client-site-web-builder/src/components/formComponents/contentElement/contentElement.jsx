import React from "react";
import StandardElement from "./../standardElement";
import WoxComponents from "./../woxComponents/woxComponents";
import ButtonElement from "./buttonElement";

export default function ContentElement(props) {
  const { type, onChange, element, elementData, woxComponents } = props;
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
      return (
        <WoxComponents
          key={"components"}
          layout="single"
          compsM={elementData.ids ? elementData.ids : []}
          woxComponents={woxComponents}
          onChange={test => {
            onChange({ name: "content", value: { ids: test.value } });
          }}
        />
      );
    default:
      return <h1>Not supported yet</h1>;
  }
}
