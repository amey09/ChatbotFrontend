import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  sessionInfo: null,
};

const userSlice = createSlice({
  name: "customSession",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      const newBooking = {
        id: uuidv4(),
        ...action.payload,
      };
      state.sessionInfo.push(newBooking);
    },
    deleteBooking: (state, action) => {
      const bookingId = action.payload;
      console.log(`Deleting Id initiated: ${bookingId}`);
      const index = state.userBookings.findIndex(
        (booking) => booking.id === bookingId
      );
      if (index !== -1) {
        state.userBookings.splice(index, 1);
      }
    },
    setUserDetails: (state, action) => {
      return { ...state, sessionInfo: action.payload };
    },
  },
});

export const { setBooking, setUserDetails, deleteBooking } = userSlice.actions;

export default userSlice.reducer;
