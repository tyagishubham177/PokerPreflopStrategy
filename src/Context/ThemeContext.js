import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { THEMES } from '../Constants/Themes';
import { SOUND_SETTINGS_LS_KEY } from '../Constants/StorageKeys';

export const ThemeContext = createContext({
  themeName: 'light',
  setThemeName: () => {},
});

export const ThemeProviderWrapper = ({ children }) => {
  const [themeName, setThemeName] = useState('light');

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
      console.error('Failed to load theme from localStorage', e);
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
      console.error('Failed to save theme to localStorage', e);
    }
  }, [themeName]);

  const theme = THEMES[themeName] || THEMES.light;

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
