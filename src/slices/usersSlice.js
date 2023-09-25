import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userAge: "",
    userBookings: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setBooking: (state, action) => {
            const newBooking = action.payload;
            state.userBookings.push(newBooking);
        },
        setUserDetails: (state, action) => {
            const {name, age} = action.payload;
            state.userName = name
            state.userAge = age
        }
    }
})

export const {setBooking, setUserDetails} = userSlice.actions;

export default userSlice.reducer;