import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./operations";

const handlePending = state => { state.isLoading = true };
const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};


export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(addContact.pending, handlePending)
            .addCase(deleteContact.pending, handlePending)

            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.rejected, handleRejected)

            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;

            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);

            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items.splice(index, 1);

            })

    }
}
);

export const contactsReducer = contactsSlice.reducer;

