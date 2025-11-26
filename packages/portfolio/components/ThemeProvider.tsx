'use client';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '@/theme/theme';
import { ThemeContextProvider, useThemeMode } from '@/theme/ThemeContext';

function ThemedContent({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <ThemedContent>{children}</ThemedContent>
    </ThemeContextProvider>
  );
}


