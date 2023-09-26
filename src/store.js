import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import messagesSlice from "./slices/messagesSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        messages: messagesSlice,
    }
})