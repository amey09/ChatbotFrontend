import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import messagesReducer from "./slices/messagesSlice";
import usersReducers from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    messages: messagesReducer,
    users: usersReducers,
  },
});
