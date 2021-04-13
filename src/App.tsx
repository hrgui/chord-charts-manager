import "./index.css";
import React from "react";
import AppProvider from "./components/app/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <div className="App">
        <h1>Hello world</h1>
      </div>
    </AppProvider>
  );
}
