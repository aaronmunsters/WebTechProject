import React from "react";
import WoxComponents from "./../woxComponents/woxComponents";

/* ------------------------------------------------------------------
  An Element wich can contain multiple components these will be displayed
  horizontaly from left to right. In the future we would also like to 
  display them from top to bottom (for nested containers), but for 
  now (although it probably wouldn't be that hard to implement) this
  feature still isn't implemented yet.
  -------------------------------------------------------------------*/
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
