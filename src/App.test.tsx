import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";

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
  const { getByText } = renderWithRedux(<App />);
  expect(getByText("Refuse & Recycling Collection")).toBeInTheDocument();
});
