import React from "react";
import Card from "../Card/Card";

import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <Card className={classes["message"]}>
      <i className="fa-solid fa-exclamation"></i>
      <h1>{props.children}</h1>
    </Card>
  );
};

export default Message;
