import { createSlice } from "@reduxjs/toolkit"; // Import the `createSlice` function from Redux Toolkit

// Define a slice for managing user-related state
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [], // Keep it as an array
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state.data = action.payload; // Use spread operator to create a new array
      console.log(state.data);
    },
    clearUserInfo: (state) => {
      state.data = []; // Reset to an empty array on sign-out
    },
  },
});


// Export the action creators generated for each reducer
export const { saveUserInfo, clearUserInfo } = userSlice.actions;

// Export the reducer function to be used in the Redux store
export default userSlice.reducer;