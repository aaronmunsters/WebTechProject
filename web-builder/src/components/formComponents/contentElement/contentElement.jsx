import React from "react";
import ButtonElement from "./buttonElement";
import ClickPick from "./clickPick";
import TextElement from "./textElement";
import PictureFolderElement from "./pictureFolderElement";
import CarouselElement from "./carouselElement";
import ContainerElement from "./containerElement";

/* ------------------------------------------------------------------
When a contentElement is added we have to determine which kind of
content Element we want displayed. This is chosen by the type prop.
contentElement is just a big switch case on the type to give back
the correct Element
-------------------------------------------------------------------*/
export default function ContentElement(props) {
  let theseprops = { ...props };
  theseprops.onChange = value => {
    props.onChange({ value: value, name: "content" });
  };
  const { onChange, type, elementData } = theseprops;
  switch (type) {
    case "text":
      return (
        <TextElement
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
    case "carousel":
      return <CarouselElement {...theseprops} />;
    default:
      return <h1>Not supported yet</h1>;
  }
}
