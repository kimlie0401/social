import { Popup } from "semantic-ui-react";
import React from "react";

const style = {
  //   borderRadius: 0,
  opacity: 0.7,
  padding: "0.5rem"
};

const MyPopup = ({ content, children }) => {
  return <Popup style={style} inverted content={content} trigger={children} />;
};

export default MyPopup;
