import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rootReducer } from "./reducers";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import App from "./App";

import { configureStore } from "@reduxjs/toolkit";

const storeCreator = preloadedState =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    preloadedState
  });

function renderWithRedux(
  ui,
  { initialState, store = storeCreator(initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

it("renders welcome message", () => {
  const { getByText } = renderWithRedux(<App />);
  expect(getByText("Refuse & Recycling Collection")).toBeInTheDocument();
});
