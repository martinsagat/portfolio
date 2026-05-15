import { Typography, TypographyProps } from '@mui/material';

export function SectionTitle({ children, sx, ...rest }: TypographyProps) {
  return (
    <Typography variant="h2" sx={{ mb: 6, textAlign: 'center', ...sx }} {...rest}>
      {children}
    </Typography>
  );
}
