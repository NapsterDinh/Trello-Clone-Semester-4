import { createSlice, current } from "@reduxjs/toolkit";
import { mapOrder } from 'utilities/sort'

// toogle show hide panel cart
const initialState = {
    board: '',
    listUserBoard: '',
    listNotUserBoard: '',
    listTag: ''
};

export const counterSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    boardHandleActionReducer: (state=initialState, action) => {
        switch (action.payload.type) {
            case 'SET_BOARD':
                console.log(action)
                state.board = action.payload.board
                break;
            case 'SET_LIST_TAG':
                state.listTag = action.payload.listTag
                break;
            case 'SET_COLUMNS':
                state.board.columns = action.payload.columns
                break;
            case "SET_LIST_USER_BOARD":
                state.listUserBoard = action.payload.listUserBoard
                state.listNotUserBoard = action.payload.listNotUserBoard
                break;
            case 'ADD_USER_TO_BOARD':
                state.listUserBoard.push(action.payload.user)
                state.listNotUserBoard.splice(
                    state.listNotUserBoard.findIndex(item => item._id === action.payload.user._id), 1
                )
                break
            case 'REMOVE_USER_FROM_BOARD':
                console.log(action)
                state.listNotUserBoard.push(action.payload.user)
                state.listUserBoard.splice(
                    state.listUserBoard.findIndex(item => item._id === action.payload.user._id), 1
                )
                console.log(current(state))
                break
            case 'SET_TITLE_BOARD':
                state.board.title = action.payload.title
                break
            case 'UPDATE_CARD':
                state.board.columns[action.payload.card.indexCol].cards[action.payload.card.indexCard] = action.payload.card
                break
            case 'UPDATE_TAGLIST':
                state.listTag = action.payload.listTag
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
