import React from "react";
import { Form } from "react-bootstrap";
import ComponentsInPage from "./woxComponents/woxComponentsInPage";
import ColorPicker from "./colorPicker/colorPicker";
import StandardElement from "./standardElement";
import ContentElement from "./contentElement/contentElement";

export default function WoxForm(props) {
  const { onInputChange, data, lists, onSetData, onSubmit, newContent } = props;

  const getvalue = element => {
    if (typeof data[element.key] === "object") {
      //special cases:
      if (element.key === "pages") {
        return data[element.key].toString();
      } else if (element.key === "content") {
        return data[element.key].text;
      } else return data[element.key].id;
    } else return data[element.key];
  };

  const handleFormElement = (element, group) => {
    if (element.group) {
      return (
        <Form.Row key={"Row" + element.groupElements[0].key}>
          {element.groupElements.map(formElement =>
            handleFormElement(formElement, true)
          )}
        </Form.Row>
      );
    } else if (element.key === "backgroundColor") {
      return <ColorPicker onChange={onInputChange} />;
    } else if (element.key === "comps") {
      return (
        <ComponentsInPage
          key={element.label}
          compsL={data.compsL}
          compsM={data.compsM}
          compsR={data.compsR}
          allComponents={lists[element.options]}
          onMove={(column1, column2) => {
            onSetData([column1.name], column1.data);
            onSetData([column2.name], column2.data);
          }}
          onReorder={column => {
            onSetData([column.name], column.data);
          }}
        />
      );
    } else if (element.key === "content") {
      return (
        <ContentElement
          element={element}
          woxComponents={lists.woxComponents}
          elementData={data[element.key]}
          type={data.type}
          onChange={onInputChange}
        />
      );
    } else {
      return (
        <StandardElement
          element={element}
          group={group}
          value={getvalue(element)}
          lists={lists}
          onChange={onInputChange}
        />
      );
    }
  };
  return (
    <form onSubmit={event => onSubmit(event)}>
      {newContent.map(element => handleFormElement(element))}
      <button type="submit">Submit</button>
    </form>
  );
}
