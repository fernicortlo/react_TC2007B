import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b53f3f',
      contrastText: '#fafafb',
    },
    secondary: {
      main: '#77b431',
    },
    background: {
      default: '#fafafb',
      paper: '#fafafb',
    },
    error: {
      main: '#b53f3f',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b4d5b1',
    },
    secondary: {
      main: '#b4d5b1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      secondary: '#b3b3b3',
    },
    error: {
      main: '#ff867c',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});
