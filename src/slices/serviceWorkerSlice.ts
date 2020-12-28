import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceWorkerSliceState {
  serviceWorkerInitialized: boolean;
  serviceWorkerUpdated: boolean;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

export const serviceWorkerSliceInitialState: ServiceWorkerSliceState = {
  serviceWorkerInitialized: false,
  serviceWorkerUpdated: false,
};

const slice = createSlice({
  name: "serviceWorker",
  initialState: serviceWorkerSliceInitialState,
  reducers: {
    successfulRegistration(
      state,
      action: PayloadAction<ServiceWorkerRegistration>
    ) {
      // eslint-disable-next-line prettier/prettier
      console.log('serviceworkerslice', action)
      state.serviceWorkerInitialized = true;
      state.serviceWorkerRegistration = action.payload;
    },
    updateAvailable(state, action: PayloadAction<ServiceWorkerRegistration>) {
      // eslint-disable-next-line prettier/prettier
      console.log('serviceworkerslice', action)
      state.serviceWorkerUpdated = true;
      state.serviceWorkerRegistration = action.payload;
    },
  },
});

export const { successfulRegistration } = slice.actions;

export default slice.reducer;
