import "./polyfills";
import "./setupDevEnv";
import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import "./i18n";
import initializeFirebaseApp from "lib/firebase";

export async function bootstrap() {
  const appConfig = await (await import("./app-config.json")).default;
  initializeFirebaseApp(appConfig.firebase);
  ReactDOM.render(
    <React.StrictMode>
      <App config={appConfig} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

bootstrap();
