import React from "react";
import WoxComponents from "./../woxComponents/woxComponents";
import ButtonElement from "./buttonElement";
import ClickPick from "./clickPick";
import MarkdownElement from "./markdownElement";
import PictureFolderElement from "./pictureFolderElement";
import CarrouselElement from "./carrouselElement";

export default function ContentElement(props) {
  const { type, onChange, element, elementData, woxComponents } = props;
  switch (type) {
    case "text":
      element.formType = "textarea";
      return (
        <MarkdownElement
          value={elementData.text}
          onChange={text =>
            onChange({ value: { text: text }, name: "content" })
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
    case "clickablePicture":
      return <ClickPick {...props} />;
    case "pictureFolder":
      return <PictureFolderElement {...props} />;
    case "carrousel":
      return <CarrouselElement {...props} />;
    default:
      return <h1>Not supported yet</h1>;
  }
}
