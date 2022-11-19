import React from "react";
import ShowText from "react-show-more-text";

export default function ShowMoreText({ text }) {
  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }
  console.log("TExt", text);
  return (
    <ShowText
      lines={2}
      more="Show more"
      less="Show less"
      className="content-css"
      anchorClass="my-anchor-css-class"
      expanded={false}
      onClick={executeOnClick}
      width={280}
      truncatedEndingComponent={"... "}
    >
      {text}
    </ShowText>
  );
}
