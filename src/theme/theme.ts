import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2F6FED',
      light: '#6EA8FF',
      dark: '#1D4ED8',
    },
    secondary: {
      main: '#60A5FA',
    },
    background: {
      default: '#080D17',
      paper: '#0E1624',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#AAB4C3',
    },
    success: {
      main: '#22C55E',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#FACC15',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#080D17',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0E1624',
          border: '1px solid #1B2A41',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
        },
        contained: {
          backgroundColor: '#2563EB',
          '&:hover': {
            backgroundColor: '#1D4ED8',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B1220',
          borderRadius: 8,
        },
        notchedOutline: {
          borderColor: '#23324A',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#AAB4C3',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0E1624',
          border: '1px solid #1B2A41',
        },
      },
    },
  },
});