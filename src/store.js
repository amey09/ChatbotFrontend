import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {apiSlice} from "./slices/apiSlice";
import usersReducers from "./slices/usersSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        users: usersReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,
});

export default store;
