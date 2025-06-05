import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { THEMES } from "../Constants/Themes";
import { SOUND_SETTINGS_LS_KEY } from "../Constants/StorageKeys";
import { COLORS } from "../Constants/Colors";

export const ThemeContext = createContext({
  themeName: "forest",
  setThemeName: () => {},
});

export const ThemeProviderWrapper = ({ children }) => {
  const [themeName, setThemeName] = useState("forest");

  // Load saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) {
          setThemeName(parsed.theme);
        }
      }
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
    }
  }, []);

  // Persist theme when it changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      let settings = {};
      if (saved) {
        settings = JSON.parse(saved);
      }
      settings.theme = themeName;
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
    document.documentElement.style.setProperty(
      "--selected-tab-color",
      COLORS.selectedTabText,
    );
    document.documentElement.style.setProperty(
      "--selected-tab-background",
      COLORS.selectedTabBackground,
    );
    document.documentElement.style.setProperty(
      "--app-header-bg",
      COLORS.appHeaderBg,
    );
    document.documentElement.style.setProperty(
      "--app-link-color",
      COLORS.appLink,
    );
  }, [themeName]);

  const theme = THEMES[themeName] || THEMES.forest;

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
