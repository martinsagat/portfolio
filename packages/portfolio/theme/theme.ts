import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    accent?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
      light: 'rgba(100, 255, 218, 0.1)',
      dark: '#4fd3b8',
    },
    secondary: {
      main: '#8892b0',
    },
    background: {
      default: '#0a182e',
      paper: '#112240',
    },
    text: {
      primary: '#ccd6f6',
      secondary: '#8892b0',
    },
    accent: {
      main: '#64ffda',
      light: 'rgba(100, 255, 218, 0.1)',
      dark: '#4fd3b8',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: 'clamp(40px, 8vw, 80px)',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: 600,
      lineHeight: 1.1,
    },
    h3: {
      fontSize: 'clamp(20px, 4vw, 24px)',
      fontWeight: 600,
    },
    body1: {
      fontSize: '18px',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '16px',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '999px',
          padding: '1rem 2rem',
          fontWeight: 600,
          fontSize: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          border: '2px solid',
          borderColor: 'rgba(100, 255, 218, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: '#64ffda',
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(100, 255, 218, 0.12)',
          },
        },
      },
    },
  },
});


