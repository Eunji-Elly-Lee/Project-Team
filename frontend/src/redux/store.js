import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import userReducer from "redux/userSlice"
import themeReducer from "redux/themeSlice"

const reducers = combineReducers({
  user: userReducer,
  theme: themeReducer
});

const persistConfig = {
  key: "root",
  storage: storageSession
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
