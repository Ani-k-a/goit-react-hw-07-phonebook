import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://648b376317f1536d65ea9c0b.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/contacts');
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const addContact = createAsyncThunk(
    'contact/addContact',
    async (text, thunkApi) => {
        try {
            const response = await axios.post('/contacts', text);
            return response.data;
        }
        catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${id}`);
            return response.data;
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)

        }
    }
)