import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/slice";

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={s.table}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} {...contact} />
      ))}
    </div>
  );
}

export default ContactList;
