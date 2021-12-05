import { createSlice, current } from "@reduxjs/toolkit";
import { mapOrder } from 'utilities/sort'

// toogle show hide panel cart
const initialState = {
    board: '',
    listUserBoard: ''
};

export const counterSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    boardHandleActionReducer: (state=initialState, action) => {
        switch (action.payload.type) {
            case 'SET_BOARD':
                state.board = action.payload.board
                break;
            case 'SET_COLUMNS':
                state.board.columns = action.payload.columns
                break;
            case "SET_LIST_USER_BOARD":
                state.listUserBoard = action.payload.listUserBoard
                break;
            case 'ADD_USER_TO_BOARD':
                state.listUserBoard.listUserBoard.push(action.payload.user)
                state.listUserBoard.listNotUserBoard.splice(
                    state.listUserBoard.listNotUserBoard.findIndex(item => item._id === action.payload.user._id), 1
                )
                break
            case 'REMOVE_USER_FROM_BOARD':
                state.listUserBoard.listNotUserBoard.push(action.payload.user)
                state.listUserBoard.listUserBoard.splice(
                    state.listUserBoard.listUserBoard.findIndex(item => item._id === action.payload.user._id), 1
                )
                break
            case 'SET_TITLE_BOARD':
                state.board.title = action.payload.title
                break
            case 'UPDATE_CARD':
                state.board.columns[action.payload.card.indexCol].cards[action.payload.card.indexCard] = action.payload.card
                break
            default:
                state = {
                    board: '',
                    listUserBoard: ''
                }
                break;
        }
    }
  },
});
export const { boardHandleActionReducer } = counterSlice.actions;

export default counterSlice.reducer;
