import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import * as serviceWorker from "./serviceWorker";

export function bootstrap(appConfig) {
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
