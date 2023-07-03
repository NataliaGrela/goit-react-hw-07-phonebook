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
