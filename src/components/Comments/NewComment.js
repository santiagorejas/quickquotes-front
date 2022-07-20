import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHttp } from "../../hooks/use-http";
import { AuthContext } from "../../context/AuthContext";

import classes from "../../styles/Forms.module.css";
import Message from "../UI/Message/Message";

const NewComment = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { token, isLoggedIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().trim().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(props.quoteId);
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/comment`,
          "POST",
          JSON.stringify({
            content: values.comment,
            quoteId: props.quoteId,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        resetForm();
        props.onAddComment(data.comment);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (!isLoggedIn) {
    return <Message>You must be logged in to comment.</Message>;
  }

  return (
    <Card className={classes["form__container"]} style={{ maxWidth: "none" }}>
      <form className={classes["form"]} onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          name="comment"
          id="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
          className={classes["form__input"]}
          multiline
          rows={3}
          placeholder="Escribe tu comentario..."
          disabled={isLoading}
        />
        <Button variant="outlined" type="submit" disabled={isLoading}>
          Comment
        </Button>
      </form>
    </Card>
  );
};

export default NewComment;
