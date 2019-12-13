import React from "react";
import { Form } from "react-bootstrap";
import StandardElement from "../standardElement";

export default function ButtonElement(props) {
  const { onChange, element, elementData } = props;
  const { label, ...rest } = element;
  rest.formType = "text";
  return (
    <Form.Row key={"Row" + element.key}>
      <StandardElement
        element={{ label: "buttonText", ...rest }}
        group={true}
        value={elementData.text}
        onChange={target =>
          onChange({
            value: { text: target.value, link: elementData.value },
            name: target.name
          })
        }
      />
      <StandardElement
        element={{ label: "buttonLink", ...rest }}
        group={true}
        value={elementData.link}
        onChange={target =>
          onChange({
            value: { link: target.value, text: elementData.text },
            name: target.name
          })
        }
      />
    </Form.Row>
  );
}
