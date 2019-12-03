import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CookieDialogState {
  viewed: boolean;
  open: boolean;
}

interface CookieDialogViewedPayload {
  viewed: boolean;
}

export const cookieDialogInitialState: CookieDialogState = {
  viewed: false,
  open: false
};

const cookieDialogSlice = createSlice({
  name: "cookieDialog",
  initialState: cookieDialogInitialState,
  reducers: {
    setViewed(state, action: PayloadAction<CookieDialogViewedPayload>) {
      const { viewed } = action.payload;
      state.viewed = viewed;
    },
    toggleOpen(state) {
      state.open = !state.open;
    }
  }
});

export const { setViewed, toggleOpen } = cookieDialogSlice.actions;

export default cookieDialogSlice.reducer;
