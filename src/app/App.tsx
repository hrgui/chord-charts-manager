import React from "react";
import "lib/global.css";
import AppController from "./core/AppController";
import AppLayout from "./core/AppLayout";
import AppRootRoutes from "./AppRootRoutes";

function App({ children, config }: { children?; config? }) {
  return (
    <AppController config={config}>
      <AppLayout>{children ? children : <AppRootRoutes />}</AppLayout>
    </AppController>
  );
}

export default App;
