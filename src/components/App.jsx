import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFilter,
  fetchContacts,
  postContact,
  removeContact,
} from '../slice/phonebook';

const App = () => {
  const { contacts, filter, status } = useSelector(state => state.phonebook);
  console.log(status, contacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = filter => {
    dispatch(updateFilter({ query: filter }));
  };

  const handleAddContact = () => {
    const contactExists = name => {
      return contacts.find(
        item => item.name.toUpperCase() === name.toUpperCase()
      );
    };
    if (!contactExists(name)) {
      dispatch(
        postContact({
          name,
          phone: number,
        })
      );
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const handleDeleteContact = id => {
    dispatch(removeContact(id));
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
