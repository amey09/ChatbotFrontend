import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userAge: "",
    userBookings: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
})

export default userSlice.reducer;