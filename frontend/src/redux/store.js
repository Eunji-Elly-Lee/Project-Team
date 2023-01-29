import { configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/userSlice"
import themeReducer from "redux/themeSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer
  }
});
