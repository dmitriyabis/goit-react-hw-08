import { useDispatch } from "react-redux";
import { FaUser, FaPhone } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice";
import s from "./Contact.module.css";

function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={s.item}>
      <div className={s.label}>
        <FaUser />
        <p className={s.p}>Name: {name}</p>
      </div>
      <div className={s.label}>
        <FaPhone />
        <p className={s.p}>Number: {number}</p>
      </div>
      <button className={s.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Contact;
