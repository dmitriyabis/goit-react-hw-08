import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";

export default function ContactsPage() {
  return (
    <section>
      <h1>Contacts</h1>
      <SearchBox />
      <ContactList />
      <ContactForm />
    </section>
  );
}
