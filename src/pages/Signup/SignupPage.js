import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import Card from "../../components/UI/Card/Card";
import classes from "../../styles/Forms.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import { useHttp } from "../../hooks/use-http";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { login } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().trim().required(),
      password: Yup.string().trim().required(),
      email: Yup.string().email().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/user/auth/signup`,
          "POST",
          JSON.stringify({
            nickname: values.user,
            email: values.email,
            password: values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        if (data.token) {
          login(data.id, data.token, data.nickname);
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Card className={classes["form__container"]}>
      <form className={classes["form"]} onSubmit={formik.handleSubmit}>
        <div className={classes["form__input-container"]}>
          <TextField
            placeholder="User"
            name="user"
            id="user"
            value={formik.values.user}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            className={classes["form__input"]}
          />
          {formik.errors.user && formik.touched.user && (
            <p className={classes["error-text"]}>{formik.errors.user}</p>
          )}
        </div>
        <div className={classes["form__input-container"]}>
          <TextField
            placeholder="Password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            type="password"
            className={classes["form__input"]}
            inputProps={{
              autoComplete: "new-password",
            }}
          />
          {formik.errors.password && formik.touched.password && (
            <p className={classes["error-text"]}>{formik.errors.password}</p>
          )}
        </div>
        <div className={classes["form__input-container"]}>
          <TextField
            placeholder="E-mail"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            type="email"
            className={classes["form__input"]}
          />
          {formik.errors.email && formik.touched.email && (
            <p className={classes["error-text"]}>{formik.errors.email}</p>
          )}
        </div>
        <Button variant="outlined" type="submit" disabled={isLoading}>
          Signup
        </Button>
      </form>
    </Card>
  );
};

export default SignupPage;
