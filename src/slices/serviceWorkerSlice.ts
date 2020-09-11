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
      const serviceWorkerRegistration = action.payload;
      state.serviceWorkerInitialized = true;
      state.serviceWorkerRegistration = serviceWorkerRegistration;
    },
    updateAvailable(state, action: PayloadAction<ServiceWorkerRegistration>) {
      state.serviceWorkerUpdated = !state.serviceWorkerUpdated;
      state.serviceWorkerRegistration = action.payload;
    },
  },
});

export const { successfulRegistration } = slice.actions;

export default slice.reducer;
