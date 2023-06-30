import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  loadContactsLocalStorage,
  deleteContact,
  updateFilter,
} from '../slice/phonebook';

const App = () => {
  const { contacts, filter } = useSelector(state => state.phonebook);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(loadContactsLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleFilter = filter => {
    dispatch(updateFilter({ query: filter }));
  };

  const handleAddContact = () => {
    dispatch(
      addContact({
        name,
        number,
      })
    );
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact({ id }));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>

      <ContactForm
        onAddContact={handleAddContact}
        onChangeName={value => setName(value)}
        onChangePhone={value => setNumber(value)}
      />

      <h2>Contacts</h2>

      <Filter contacts={contacts || []} onChangeFilter={handleFilter} />

      <ContactList
        filter={filter}
        contacts={contacts || []}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
