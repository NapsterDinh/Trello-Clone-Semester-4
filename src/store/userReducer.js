import { createSlice } from "@reduxjs/toolkit";

// toogle show hide panel cart
const initialState = {
  user: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReducer: (state, action) => {
      state.user = action.payload;
    },
    clearResults()
    {
      // Note that this should be left intentionally empty.
			// Clearing redux state and localForage happens in rootReducer
    }
  },
});
export const { userReducer, clearResults } = counterSlice.actions;

export default counterSlice.reducer;
