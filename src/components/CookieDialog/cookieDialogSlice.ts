import { createSlice } from "@reduxjs/toolkit";

const cookieDialogSlice = createSlice({
  name: "cookieDialog",
  initialState: { viewed: false, open: false },
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
