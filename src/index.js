import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Styles/styles.css";
import "./i18n";
import { SOUND_SETTINGS_LS_KEY } from './Constants/StorageKeys';
import { ThemeProvider } from '@mui/material/styles';
import { THEMES } from './Constants/Themes';

let themeName = 'light';
try {
  const saved = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.fontFamily) {
      document.documentElement.style.setProperty('--app-font-family', parsed.fontFamily);
    }
    if (parsed.theme) {
      themeName = parsed.theme;
    }
  }
} catch (e) {
  console.error('Failed to load settings from localStorage', e);
}

const theme = THEMES[themeName] || THEMES.light;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
