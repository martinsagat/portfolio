'use client';

import { Box } from '@mui/material';
import { ReactNode, useCallback, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  range?: number;
}

export function MagneticButton({
  children,
  strength = 0.35,
  range = 60,
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(rect.width, rect.height) / 2 + range;
      if (dist > radius) {
        node.style.transform = 'translate3d(0,0,0)';
        return;
      }
      node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    },
    [range, strength]
  );

  const handleLeave = useCallback(() => {
    const node = innerRef.current;
    if (node) node.style.transform = 'translate3d(0,0,0)';
  }, []);

  return (
    <Box
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      sx={{
        display: 'inline-flex',
        '@media (hover: none), (prefers-reduced-motion: reduce)': {
          pointerEvents: 'auto',
        },
      }}
    >
      <Box
        ref={innerRef}
        sx={{
          display: 'inline-flex',
          transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
          '@media (hover: none), (prefers-reduced-motion: reduce)': {
            transform: 'none !important',
            transition: 'none',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
