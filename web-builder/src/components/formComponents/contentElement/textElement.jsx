import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./simplemde.css";

/* ------------------------------------------------------------------
The text element uses an external library called react-simplemde-editor.
This is simply a text field with some markdown markup.
-------------------------------------------------------------------*/
export default function TextElement(props) {
  return <SimpleMDE {...props} options={{ spellChecker: false }} />;
}
