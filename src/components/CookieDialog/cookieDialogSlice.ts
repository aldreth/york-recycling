import { createSlice } from "@reduxjs/toolkit";

interface CookieDialogState {
  open: boolean;
}


export const cookieDialogInitialState: CookieDialogState = {
  open: false
};

const cookieDialogSlice = createSlice({
  name: "cookieDialog",
  initialState: cookieDialogInitialState,
  reducers: {
    toggleOpen(state) {
      state.open = !state.open;
    }
  }
});

export const { toggleOpen } = cookieDialogSlice.actions;

export default cookieDialogSlice.reducer;
