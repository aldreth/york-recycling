import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "App";
import { stub } from "testUtils/stub";

import { rootReducer, RootState } from "./reducers";

const storeCreator = (preloadedState: RootState) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    preloadedState,
  });

function renderWithRedux(
  ui: JSX.Element,
  {
    initialState = stub<RootState>({}),
    store = storeCreator(initialState),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

it("renders welcome message", () => {
  renderWithRedux(<App />);
  expect(screen.getByText("Refuse & Recycling Collection")).toBeInTheDocument();
});
