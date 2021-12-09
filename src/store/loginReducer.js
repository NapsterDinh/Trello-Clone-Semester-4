import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

export const counterSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginReducer } = counterSlice.actions;

export default counterSlice.reducer;
