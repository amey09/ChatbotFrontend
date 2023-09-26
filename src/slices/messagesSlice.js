import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            const {message, type, id, widget} = action.payload;
            const isDuplicate = state.messages.some((existingMessage) => {
                return existingMessage.id === id;
            });
            
            if (!isDuplicate) {
                const newMessage = {message, type, id, widget};
                state.messages = [...state.messages, newMessage];
            }
        },
    }
})

export const {setMessage} = messageSlice.actions;

export default messageSlice.reducer;