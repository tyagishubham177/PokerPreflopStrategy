import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Styles/styles.css";
import "./i18n";
import { SOUND_SETTINGS_LS_KEY } from './Constants/StorageKeys';
import { ThemeProviderWrapper } from './Context/ThemeContext';

try {
  const saved = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.fontFamily) {
      document.documentElement.style.setProperty('--app-font-family', parsed.fontFamily);
    }
  }
} catch (e) {
  console.error('Failed to load font from localStorage', e);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  </React.StrictMode>
);

reportWebVitals();
