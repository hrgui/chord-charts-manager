import "./setupDevEnv";
import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import { AppConfig } from "lib/appConfig";
import initializeFirebaseApp from "lib/firebase";

export function bootstrap(appConfig: AppConfig) {
  initializeFirebaseApp(appConfig.firebase);
  ReactDOM.render(
    <React.StrictMode>
      <App config={appConfig} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

bootstrap(require("./app-config.json"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
