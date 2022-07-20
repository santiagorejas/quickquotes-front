import React from "react";

import classes from "./Comments.module.css";

const Comments = (props) => {
  if (props.comments.length === 0) return <h1>No comments were found.</h1>;

  return (
    <ul className={classes["comments"]}>
      {props.comments.map((comment) => (
        <li className={classes["comment"]}>
          <p>{comment.content}</p>
          <div>
            <span>{comment.author}</span>
            <span>{new Date(comment.date).toLocaleDateString("es-AR")}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
