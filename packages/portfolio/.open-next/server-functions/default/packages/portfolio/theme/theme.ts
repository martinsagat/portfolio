import { createTheme, Theme } from '@mui/material/styles';

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

const typography = {
  fontFamily: [
    'var(--font-inter)',
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
    lineHeight: 1.15,
    letterSpacing: '-0.04em',
  },
  h2: {
    fontSize: 'clamp(28px, 5vw, 36px)',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: 'clamp(22px, 4vw, 28px)',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: 'clamp(18px, 3vw, 22px)',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: 'clamp(14px, 2vw, 18px)',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '17px',
    lineHeight: 1.65,
    letterSpacing: '-0.01em',
    fontWeight: 400,
  },
  body2: {
    fontSize: '15px',
    lineHeight: 1.6,
    letterSpacing: '-0.005em',
    fontWeight: 400,
  },
  button: {
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
};

const components = (mode: 'dark' | 'light') => ({
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
        borderColor: mode === 'dark' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        backgroundColor: mode === 'dark' ? undefined : '#ffffff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: mode === 'dark' ? '#64ffda' : 'rgba(10, 124, 107, 0.3)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
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
  typography,
  components: components('dark'),
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A75BCFF',
      light: 'rgba(10, 124, 107, 0.1)',
      dark: '#064d42',
    },
    secondary: {
      main: '#64748b',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    accent: {
      main: '#0a7c6b',
      light: 'rgba(10, 124, 107, 0.1)',
      dark: '#064d42',
    },
  },
  typography,
  components: components('light'),
});

// Keep the default export as dark theme for backward compatibility
export const theme = darkTheme;


