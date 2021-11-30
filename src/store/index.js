import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import loginReducer from "./loginReducer";
import getTokenReducer from "./getTokenReducer";
import userReducer from "./userReducer";
import mainWorkSpaceReducer from "./mainWorkSpaceReducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
    login: loginReducer,
    getToken: getTokenReducer,
    user: userReducer,
    workSpace: mainWorkSpaceReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
