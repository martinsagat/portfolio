'use client';

import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

interface HexagonLogoProps {
  size?: number;
  onClick?: () => void;
}

export default function HexagonLogo({ size = 40, onClick }: HexagonLogoProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/');
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        padding: 0,
        color: 'text.secondary',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)',
          color: 'primary.main',
        },
      }}
      aria-label="Home"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50, 5
            L 15, 27
            A 4 4 0 0 1 11, 31
            L 11, 69
            A 4 4 0 0 1 15, 73
            L 50, 95
            L 85, 73
            A 4 4 0 0 1 89, 69
            L 89, 31
            A 4 4 0 0 1 85, 27
            Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontSize="40"
          fill="currentColor"
          fontFamily="var(--font-geist-mono, monospace)"
          fontWeight="bold"
        >
          M
        </text>
      </svg>
    </IconButton>
  );
}

