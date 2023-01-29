import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme : false
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightTheme(state) {
      state.theme = true;
    },
    darkTheme(state) {
      state.theme = initialState.theme;
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
