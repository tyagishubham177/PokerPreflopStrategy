import { createTheme } from '@mui/material/styles';

export const THEMES = {
  light: createTheme({
    palette: { mode: 'light' },
    typography: { fontFamily: 'var(--app-font-family)' },
  }),
  dark: createTheme({
    palette: { mode: 'dark' },
    typography: { fontFamily: 'var(--app-font-family)' },
  }),
  forest: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#2e7d32' },
      secondary: { main: '#81c784' },
    },
    typography: { fontFamily: 'var(--app-font-family)' },
  }),
};
