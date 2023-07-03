import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://64a2e4e3b45881cc0ae5da5f.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const postContact = createAsyncThunk('contacts/post', async contact => {
  const response = await axios.post(API_URL, contact);
  return response.data;
});

export const removeContact = createAsyncThunk('contacts/remove', async id => {
  const response = await axios.delete(API_URL + `/${id}`);
  return response.data;
});

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

    updateFilter: (state, action) => {
      const { query } = action.payload;
      state.filter = query;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        const { id } = action.payload;
        const contactsToDelete = [...state.contacts];
        const contactIndex = contactsToDelete.findIndex(item => item.id === id);
        contactsToDelete.splice(contactIndex, 1);
        state.contacts = contactsToDelete;
      });
  },
});

export const {
  addContact,
  loadContactsLocalStorage,
  deleteContact,
  updateFilter,
} = slice.actions;
export default slice.reducer;
