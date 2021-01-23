import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import { App } from "./App";
import { MenuProvider } from "./context/menu-context";
import { Auth0ProviderWithHistory } from "./components/auth/auth0-provider-with-history";

import history from "./history";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Auth0ProviderWithHistory>
        <MenuProvider>
          <App />
        </MenuProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
