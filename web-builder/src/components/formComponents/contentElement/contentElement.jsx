import React from "react";
import ButtonElement from "./buttonElement";
import ClickPick from "./clickPick";
import MarkdownElement from "./markdownElement";
import PictureFolderElement from "./pictureFolderElement";
import CarrouselElement from "./carrouselElement";
import ContainerElement from "./containerElement";

export default function ContentElement(props) {
  let theseprops = { ...props };
  theseprops.onChange = value => {
    props.onChange({ value: value, name: "content" });
  };
  const { onChange, type, elementData } = theseprops;
  switch (type) {
    case "text":
      return (
        <MarkdownElement
          value={elementData.text}
          onChange={text => onChange({ text: text })}
        />
      );
    case "button":
      return <ButtonElement {...theseprops} />;
    case "container":
      return <ContainerElement {...theseprops} />;
    case "clickablePicture":
      return <ClickPick {...theseprops} />;
    case "pictureFolder":
      return <PictureFolderElement {...theseprops} />;
    case "carrousel":
      return <CarrouselElement {...theseprops} />;
    default:
      return <h1>Not supported yet</h1>;
  }
}
