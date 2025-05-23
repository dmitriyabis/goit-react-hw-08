import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import s from "./RegistrationForm.module.css";
import { useState } from "react";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setFormError(null);
    setIsLoading(true);

    const resultAction = await dispatch(register(values));
    setIsLoading(false);

    if (register.fulfilled.match(resultAction)) {
      resetForm();
    } else {
      setFormError(resultAction.payload || "Registration failed");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <label>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className={s.error} />
          </label>

          <label>
            Email
            <Field name="email" type="email" autoComplete="email" />
            <ErrorMessage name="email" component="div" className={s.error} />
          </label>

          <label>
            Password
            <Field
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <ErrorMessage name="password" component="div" className={s.error} />
          </label>

          {formError && <div className={s.error}>{formError}</div>}

          <button type="submit" disabled={isSubmitting || isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
