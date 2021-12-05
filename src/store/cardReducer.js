import { createSlice, current } from "@reduxjs/toolkit";

// toogle show hide panel cart
const initialState = {
    card: '',
};

export const counterSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    cardHandleReducer: (state=initialState, action) => {
        switch (action.payload.type) {
            case 'SET_CARD':
                state.card = action.payload.card
                break;
            case 'SET_DESCRIPTION':
                state.description = action.payload.description
                break;
            case 'SET_TITLE_CARD':
                state.title = action.payload.title
                break;
            default:
                state = {
                    card: '',
                }
                break;
        }
    }
  },
});
export const { cardHandleReducer } = counterSlice.actions;

export default counterSlice.reducer;
