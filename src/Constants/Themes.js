import { createTheme } from "@mui/material/styles";

export const THEMES = {
  forest: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#2e7d32" },
      secondary: { main: "#81c784" },
      info: { main: "#00695c", dark: "#004d40" },
      warning: { main: "#ffb300" },
      success: { main: "#388e3c" },
    },
    typography: { fontFamily: "var(--app-font-family)" },
  }),
  ocean: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#0277bd" },
      secondary: { main: "#80deea" },
      info: { main: "#00838f", dark: "#005662" },
      warning: { main: "#fbc02d" },
      success: { main: "#00796b" },
    },
    typography: { fontFamily: "var(--app-font-family)" },
  }),
  sunset: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#d84315" },
      secondary: { main: "#ffb74d" },
      info: { main: "#8e24aa", dark: "#5c007a" },
      warning: { main: "#f44336" },
      success: { main: "#388e3c" },
    },
    typography: { fontFamily: "var(--app-font-family)" },
  }),
  grape: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#6a1b9a" },
      secondary: { main: "#ba68c8" },
      info: { main: "#4a148c", dark: "#12005e" },
      warning: { main: "#ff5722" },
      success: { main: "#388e3c" },
    },
    typography: { fontFamily: "var(--app-font-family)" },
  }),
  blackWhite: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#000000" },
      secondary: { main: "#ffffff" },
      background: { default: "#ffffff", paper: "#ffffff" },
      text: { primary: "#000000", secondary: "#000000" },
      info: { main: "#333333", dark: "#000000" },
      warning: { main: "#666666" },
      success: { main: "#000000" },
    },
    typography: { fontFamily: "var(--app-font-family)" },
  }),
};
