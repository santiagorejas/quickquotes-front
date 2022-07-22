import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "../../styles/Forms.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/use-http";

const NewQuote = (props) => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttp();

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().trim().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/quote`,
          "POST",
          JSON.stringify({ content: values.content }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        props.onAddQuote(data);
        resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Card
      className={classes["form__container"]}
      style={{ marginBottom: "2rem", maxWidth: "55rem" }}
    >
      <form className={classes["form"]} onSubmit={formik.handleSubmit}>
        <TextField
          name="content"
          id="content"
          onChange={formik.handleChange}
          variant="outlined"
          multiline
          rows={3}
          className={classes["form__input"]}
          placeholder={
            isLoggedIn
              ? "Write your quote..."
              : "You must be logged for creating a quote."
          }
        />
        {formik.errors.content && (
          <p className={classes["error-text"]}>{formik.errors.content}</p>
        )}
        <Button
          type="submit"
          variant="outlined"
          disabled={isLoading || !isLoggedIn}
        >
          Post quote
        </Button>
      </form>
    </Card>
  );
};

export default NewQuote;
