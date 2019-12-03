import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rootReducer } from "./reducers";

import App from "./App";

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {}
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
