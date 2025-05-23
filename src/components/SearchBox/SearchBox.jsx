import { Formik, Form, Field } from "formik";
import { useId } from "react";
import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

function SearchBox() {
  const findUserID = useId();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleSearch = (value) => {
    dispatch(changeFilter(value));
  };

  return (
    <Formik
      initialValues={{ search: filter }}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values, handleChange }) => (
        <Form className={s.form}>
          <label htmlFor={findUserID}>Find contacts by name</label>
          <div className={s.inputGroup}>
            <Field
              id={findUserID}
              name="search"
              type="text"
              value={values.search}
              onChange={(e) => {
                handleChange(e);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SearchBox;
