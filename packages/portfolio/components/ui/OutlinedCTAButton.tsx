import { Button, ButtonProps } from '@mui/material';
import type { AnchorHTMLAttributes } from 'react';

type OutlinedCTAButtonProps = ButtonProps &
  Partial<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'download'>>;

export function OutlinedCTAButton({ sx, ...rest }: OutlinedCTAButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
          borderColor: 'primary.dark',
          backgroundColor: 'primary.main',
          color: 'background.default',
        },
        ...sx,
      }}
      {...rest}
    />
  );
}
