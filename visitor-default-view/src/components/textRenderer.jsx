import React, { Component } from "react";
import { Converter } from "showdown";

const TextRenderer = props => {
  const markdownConverter = new Converter();
  return (
    // Inserting html poses a security risk, however only the admin has these rights!
    <div
      dangerouslySetInnerHTML={{
        __html: markdownConverter.makeHtml(props.content.text)
      }}
    />
  );
};

export default TextRenderer;
