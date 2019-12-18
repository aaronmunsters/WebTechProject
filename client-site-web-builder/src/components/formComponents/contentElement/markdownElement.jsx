import React, { Component } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MarkdownElement = props => {
  const options = { spellChecker: false, maxHeight: "70vh" };

  return <SimpleMDE {...props} options={options} />;
};

export default MarkdownElement;
