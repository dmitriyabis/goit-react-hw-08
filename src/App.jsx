import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import { nanoid } from "nanoid";
import initialData from "./components/Contact/data.json";

const getInitialContacts = () => {
  const saved = localStorage.getItem("contacts");
  return saved ? JSON.parse(saved) : initialData;
};

function App() {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const contactWithId = { id: nanoid(), ...newContact };
    setContacts((prev) => [...prev, contactWithId]);
  };

  const deleteContact = (idToDelete) => {
    setContacts((prev) => prev.filter(({ id }) => id !== idToDelete));
  };

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <SearchBox onSearch={setSearch} />
        <ContactList data={filteredContacts} onDelete={deleteContact} />
      </div>
    </>
  );
}

export default App;
