import React from  "react";
import { useFormik } from 'formik';
import * as yup from "yup";

function LoginForm({onLogin}) {

    const validationSchema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        
        validationSchema,
        onSubmit: (values, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            fetch("/login", {
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
                console.log(`Error: ${error}`)
            });
        },
    });


    return (
        <div className="container">
            <form className="row d-flex justify-content-center" onSubmit={formik.handleSubmit}>
                <div className="col-3 justify-content-center">
                    <input
                    className="form-control"
                    type="text"
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="Username"
                    />
                </div>
                <div className="w-100 d-none d-md-block"></div>
                <div className="col-3 justify-content-center ">
                    <input
                    className="form-control"
                    type="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    />
                </div>
                <div className="w-100 d-none d-md-block"></div>
                <div className="col-2">
                    <button
                    className="btn btn-primary"
                    type="submit"
                    name="submit"
                    >
                    Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;