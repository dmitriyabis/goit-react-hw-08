import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\+?[0-9\s\-()]{7,20}$/, "Must be a valid number!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

function ContactForm() {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact({ id: nanoid(), ...values })); // Ensure we add an `id`
    actions.resetForm(); // Reset form after submit
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={s.form}>
        <div className={s.wrapper}>
          <div className={s.label}>
            <label htmlFor={nameId}>Name</label>
          </div>
          <Field className={s.input} type="text" name="name" id={nameId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div className={s.wrapper}>
          <div className={s.label}>
            <label htmlFor={numberId}>Number</label>
          </div>
          <Field className={s.input} type="text" name="number" id={numberId} />
          <ErrorMessage name="number" component="span" />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
