import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  userName: undefined,
  userAge: undefined,
  userBookings: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      const newBooking = {
        id: uuidv4(),
        ...action.payload,
      };
      state.userBookings.push(newBooking);
    },
    deleteBooking: (state, action) => {
      const bookingId = action.payload;
      console.log(`Deleting Id initiated: ${bookingId}`)
      const index = state.userBookings.findIndex(
        (booking) => booking.id === bookingId
      );
      if (index !== -1) {
        state.userBookings.splice(index, 1);
      }
    },

    setUserDetails: (state, action) => {
      const { name, age } = action.payload;
      state.userName = name;
      state.userAge = age;
    },
  },
});

export const { setBooking, setUserDetails, deleteBooking } = userSlice.actions;

export default userSlice.reducer;
