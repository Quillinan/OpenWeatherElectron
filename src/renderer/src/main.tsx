import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CityInfoProvider } from "./context/CityInfoContext";
import { FahrenheitProvider } from "./context/FahrenheitContext";
import { DarkModeProvider } from "./context/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <CityInfoProvider>
        <FahrenheitProvider>
          <App />
        </FahrenheitProvider>
      </CityInfoProvider>
    </DarkModeProvider>
  </React.StrictMode>,
);
