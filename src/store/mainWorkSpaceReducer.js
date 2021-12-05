import { createSlice } from "@reduxjs/toolkit";

// toogle show hide panel cart
const initialState = {
  curWP: "",
  owerWP: [],
  guestWP: [],
  type: ''
};

export const counterSlice = createSlice({
  name: "workSpace",
  initialState,
  reducers: {
    mainWorkSpaceReducer: (state=initialState, action) => {
      switch (action.payload.type) {
        case 'fetchArray':
            state.owerWP = action.payload.resultOwer
            state.guestWP = action.payload.resultGuest
            state.owerWP.map((item, index) => {
              item.boardId = action.payload.boardOwer[index]
            })
            state.guestWP.map((item, index) => {
              item.boardId = action.payload.boardGuest[index]
            })
          break;
        case 'fetchObject':
            let result = state.owerWP.filter(item => item._id === action.payload._id)
            if(result.length !== 0)
            {
                state.curWP = result[0]
                state.type = 'OWNER'
            }
            else
            {
              const result2 =  state.guestWP.filter(item => item._id === action.payload._id)
              if(result2.length !== 0)
              {
                state.curWP = result2[0]
                state.type = 'GUEST'
              }
              else
              {
                state.curWP = ''
                state.type = ''
              }
              
            }
            break;
        case 'updateCur':
            state.curWP = action.payload 
            let index = state.owerWP.findIndex((item) => item._id === action.payload._id)
            state.owerWP[index] = action.payload 
            break;
        default:
          state = {
            curWP: "",
            owerWP: [],
            guestWP: [],
            type: ''
          }
          break;
      }
    },
    settingAction: (state=initialState, action) => {
      switch (action.payload.type) {
        case "SET_PRIVACY":
          state.curWP = {
            ...state.curWP,
            priority: action.payload.privacy
          }
          if(state.type==='OWNER')
          {
            state.owerWP.map(item => {
              if(item._id === state.curWP._id)
              {
                item = {...state.curWP}
              }
            })
          }
          else
          {
            state.guestWP.map(item => {
              if(item._id === state.curWP._id)
              {
                item = {...state.curWP}
              }
            })
          }
          break;
        case "DELTE_WORKSPACE":
          
          break;
        default:
          break;
      }
    }
  },
});
export const { mainWorkSpaceReducer,settingAction } = counterSlice.actions;

export default counterSlice.reducer;
