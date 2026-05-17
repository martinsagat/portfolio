'use client';

import { Box, BoxProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface RevealProps extends BoxProps {
  delay?: number;
  threshold?: number;
}

export function Reveal({
  children,
  delay = 0,
  threshold = 0.15,
  sx,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() =>
    typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box
      ref={ref}
      className={visible ? 'reveal is-visible' : 'reveal'}
      sx={{
        animationDelay: delay ? `${delay}ms` : undefined,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
