import { createTheme } from "@mui/material/styles";

export const THEMES = {
  forest: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#2e7d32" },
      secondary: { main: "#81c784" },
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
    },
    typography: { fontFamily: "var(--app-font-family)" },
  }),
};
