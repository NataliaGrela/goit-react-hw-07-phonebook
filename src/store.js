import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import phonebook from 'slice/phonebook'; 

const reducer = combineReducers({
phonebook
})

export const store = configureStore({
  reducer,
});