import React, { Component } from "react";
import WoxComponents from "./../woxComponents/woxComponents";

export default function ContainerElement(props) {
  const { elementData, woxComponents, onChange } = props;
  return (
    <WoxComponents
      key={"components"}
      layout="single"
      compsM={elementData.ids ? elementData.ids : []}
      woxComponents={woxComponents}
      onChange={test => {
        onChange({ ids: test.value });
      }}
    />
  );
}
