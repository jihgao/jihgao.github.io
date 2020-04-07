import React from "react";

function MyLayout(props) {
  return <div className="layout" style={{ height: "100%" }}>{props.children}</div>;
}

export default MyLayout;
