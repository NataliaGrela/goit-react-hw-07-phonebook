import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const slice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: null,
    filter: '',
  },
  reducers: {
    loadContactsLocalStorage: state => {
      const storedContacts = localStorage.getItem('contacts');
      const defaultContacts = [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
      if (storedContacts) {
        let contacts = JSON.parse(storedContacts);
        if (contacts.length === 0) {
          contacts = defaultContacts;
        }
        state.contacts = contacts;
      } else {
        state.contacts = defaultContacts;
      }
    },

    addContact: (state, action) => {
      const contactExists = name => {
        return state.contacts.find(
          item => item.name.toUpperCase() === name.toUpperCase()
        );
      };
      const { name, number } = action.payload;
      if (!contactExists(name)) {
        const newContacts = [
          ...state.contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ];
        state.contacts = newContacts;
      } else {
        alert(`${name} is already in contacts`);
      }
    },

    deleteContact: (state, action) => {
      const { id } = action.payload;
      const contactsToDelete = [...state.contacts];
      const contactIndex = contactsToDelete.findIndex(item => item.id === id);
      contactsToDelete.splice(contactIndex, 1);
      state.contacts = contactsToDelete;
    },

    updateFilter: (state, action) => {
      const { query } = action.payload;
      state.filter = query;
    },
  },
});

export const {
  addContact,
  loadContactsLocalStorage,
  deleteContact,
  updateFilter,
} = slice.actions;
export default slice.reducer;
