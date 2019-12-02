import { createSlice } from "@reduxjs/toolkit";

export const cookieDialogInitialState = { viewed: false, open: false };
const cookieDialogSlice = createSlice({
  name: "cookieDialog",
  initialState: cookieDialogInitialState,
  reducers: {
    setViewed(state) {
      state.viewed = true;
    },
    toggleOpen(state) {
      state.open = !state.open;
    }
  }
});

export const { setViewed, toggleOpen } = cookieDialogSlice.actions;

export default cookieDialogSlice.reducer;
