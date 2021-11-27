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
    showPanelCart: (state, action) => {
      state.value = 'show'
    },
    hidePanelCart: (state, action) => {
      state.value = ''
    }
  },
});
export const { userReducer, showPanelCart, hidePanelCart } = counterSlice.actions;

export default counterSlice.reducer;
