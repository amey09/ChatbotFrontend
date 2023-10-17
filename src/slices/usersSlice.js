import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sessionInfo: null,
};

const userSlice = createSlice({
    name: "customSession",
    initialState,
    reducers: {
        setBooking: (state, action) => {
            const newBooking = {
                ...action.payload,
            };
            state.sessionInfo.push(newBooking);
        },
        deleteBooking: (state, action) => {
            const bookingId = action.payload;
            const index = state.userBookings.findIndex(
                (booking) => booking.id === bookingId
            );
            if (index !== -1) {
                state.userBookings.splice(index, 1);
            }
        },
        setUserDetails: (state, action) => {
            return {...state, sessionInfo: action.payload};
        },
        resetState: () => {
            return initialState;
        },
    },
});

export const {setBooking, setUserDetails, deleteBooking, resetState} =
    userSlice.actions;

export default userSlice.reducer;
