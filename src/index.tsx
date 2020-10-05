import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
// eslint-disable-next-line import/no-unresolved
import { PersistGate } from "redux-persist/integration/react";

import App from "AppWithAnalytics";
import { successfulRegistration } from "slices/serviceWorkerSlice";
import store from "store";

import * as serviceWorker from "./serviceWorker";

import "normalize.css";
import "./styles/index.css";

const persistor = persistStore(store);

// Test code scanning

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register({
  onSuccess: (reg: ServiceWorkerRegistration) =>
    store.dispatch(successfulRegistration(reg)),
  // onUpdate: (reg: ServiceWorkerRegistration) => store.dispatch({ type: SW_UPDATE, payload: reg }),
});
