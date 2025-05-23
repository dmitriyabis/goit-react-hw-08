import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import s from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    try {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        resetForm();
        navigate("/contacts");
      } else {
        setErrors({ general: resultAction.payload || "Login failed" });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, isSubmitting }) => (
        <Form className={s.form}>
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

          {errors.general && <div className={s.error}>{errors.general}</div>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
