import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";


import loginReducer from "./loginReducer";
import getTokenReducer from "./getTokenReducer";
import userReducer from "./userReducer";
import mainWorkSpaceReducer from "./mainWorkSpaceReducer";
import boardReducer from "./boardReducer";
import cardReducer from "./cardReducer";
const persistConfig = {
  key: "root",
  storage,
};

const appReducer  = combineReducers({
    login: loginReducer,
    getToken: getTokenReducer,
    user: userReducer,
    workSpace: mainWorkSpaceReducer,
    board: boardReducer,
    card: cardReducer
});

const rootReducer = (state, action) => {
  console.log(action)
  console.log(state)
  // if (action.payload.type === "USER_LOGGED_OUT") {
  //     // for all keys defined in your persistConfig(s)
  //     storage.removeItem('persist:root')
  //     // storage.removeItem('persist:otherKey')

  //     state = undefined;
  // }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default rootReducer
