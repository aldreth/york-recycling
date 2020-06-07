import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
// eslint-disable-next-line import/no-unresolved
import { PersistGate } from "redux-persist/integration/react";

import App from "AppWithAnalytics";
import store from "store";

import "normalize.css";
import "./styles/index.css";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
