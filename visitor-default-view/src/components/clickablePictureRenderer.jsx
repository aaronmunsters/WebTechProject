import React, { Component } from "react";
const CliclablePictureRenderer = props => {
  const { content } = props;
  return (
    <a href={content.link}>
      <img
        style={{ "border-radius": "50%" }}
        src={content.online ? content.source : content.id}
        alt={content.alt} // should get fetched from the database
      ></img>
    </a>
  );
};

export default CliclablePictureRenderer;
