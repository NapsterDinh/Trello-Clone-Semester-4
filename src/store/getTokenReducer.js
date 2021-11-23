import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const counterSlice = createSlice({
  name: "getToken",
  initialState,
  reducers: {
    getTokenReducer: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { getTokenReducer } = counterSlice.actions;

export default counterSlice.reducer;
