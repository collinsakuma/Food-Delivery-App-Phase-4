import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';

function SignUpForm({ onLogin }) {

    const validationSchema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required(),
        address: yup.string().required(),
        img_url: yup.string().required() 
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordConfirmation: "",
            address: "",
            img_url: ""
        },
        validationSchema,
        onSubmit: (values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((r) => {
              setSubmitting(false);
              if (r.ok) {
                r.json().then((user) => onLogin(user));
              } else {
                r.json().then((err) => setErrors(err.errors));
    
              }
            })
            .catch((error) => {
              setSubmitting(false);
              console.error(error);
            });
        },
    });

    return (
<div className="container">
  <form className="row justify-content-center" onSubmit={formik.handleSubmit}>
    <h2>Add New User</h2>
    <div className="col">
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input
          className="form-control"
          type="text"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="Username..."
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password:</label>
        <input
          className="form-control"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="password..."
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password Confirmation:</label>
        <input
          className="form-control"
          type="password"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          placeholder="Password..."
        />
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label className="form-label">Address:</label>
        <input
          className="form-control"
          type="address"
          id="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder="Address..."
        />
      </div>
      <div className="form-group">
        <label className="form-label">Bio Picture:</label>
        <input
          className="form-control"
          type="img_url"
          id="img_url"
          value={formik.values.img_url}
          onChange={formik.handleChange}
          placeholder="Image URL..."
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
    <div className="row justify-content-center">
        <input className="maroonButtonColor-btn col-2" type="submit" name="submit" value="Sign Up" />
    </div>
  </form>
</div>
    )
}

export default SignUpForm