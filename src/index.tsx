import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./components/auth/auth0-provider-with-history";

import "./index.scss";
import { StoreProvider } from "easy-peasy";
import { store } from "./store/store";
import history from "./history";

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Auth0ProviderWithHistory>
        <StoreProvider store={store}>
          <App />
        </StoreProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
