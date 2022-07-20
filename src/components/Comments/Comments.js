import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/use-http";
import Message from "../UI/Message/Message";

import classes from "./Comments.module.css";

const Comments = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { token, nickname } = useContext(AuthContext);

  const deleteCommet = async (cid) => {
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_API}/comment/${cid}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      props.onDeleteComment(cid);
    } catch (err) {
      console.log(err);
    }
  };

  if (props.comments.length === 0)
    return <Message>No comments were found.</Message>;

  console.log("Nickname: ", nickname);

  return (
    <ul className={classes["comments"]}>
      {props.comments.map((comment) => (
        <li className={classes["comment"]} key={comment._id}>
          <p>{comment.content}</p>
          <div>
            <span>{comment.author}</span>
            <span>{new Date(comment.date).toLocaleDateString("es-AR")}</span>
            {comment.author === nickname && (
              <i
                onClick={() => deleteCommet(comment._id)}
                className={`fa-solid fa-trash`}
                style={{
                  color: isLoading ? "#aaa" : "",
                  cursor: isLoading ? "inherit" : "pointer",
                }}
              ></i>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
