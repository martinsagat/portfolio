'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AuroraProps {
  intensity?: number;
}

export function Aurora({ intensity = 1 }: AuroraProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const primary = theme.palette.primary.main;
  const accent = theme.palette.accent.main;
  const blobAlpha = (isDark ? 0.32 : 0.18) * intensity;
  const blobAlphaSoft = (isDark ? 0.22 : 0.12) * intensity;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(80px)',
        },
        '&::before': {
          width: '55%',
          height: '70%',
          left: '-10%',
          top: '-10%',
          background: `radial-gradient(circle at center, ${hexToRgba(primary, blobAlpha)} 0%, ${hexToRgba(primary, 0)} 70%)`,
          animation: 'aurora-drift-a 18s ease-in-out infinite',
        },
        '&::after': {
          width: '60%',
          height: '70%',
          right: '-15%',
          bottom: '-15%',
          background: `radial-gradient(circle at center, ${hexToRgba(accent, blobAlphaSoft)} 0%, ${hexToRgba(accent, 0)} 70%)`,
          animation: 'aurora-drift-b 24s ease-in-out infinite',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&::before, &::after': { animation: 'none' },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '45%',
          height: '55%',
          left: '30%',
          top: '20%',
          borderRadius: '50%',
          filter: 'blur(90px)',
          background: `radial-gradient(circle at center, ${hexToRgba(primary, blobAlphaSoft)} 0%, ${hexToRgba(primary, 0)} 70%)`,
          animation: 'aurora-drift-c 30s ease-in-out infinite',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
    </Box>
  );
}

function hexToRgba(color: string, alpha: number): string {
  if (color.startsWith('rgba')) return color;
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  const hex = color.replace('#', '');
  const normalized =
    hex.length === 3
      ? hex.split('').map((c) => c + c).join('')
      : hex;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
