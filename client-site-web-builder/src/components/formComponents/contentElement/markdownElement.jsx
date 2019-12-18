import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./simplemde.css"

const MarkdownElement = props => {
  return <SimpleMDE {...props} options={{ spellChecker: false }} />;
};

export default MarkdownElement;
