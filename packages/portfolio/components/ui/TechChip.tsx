import { Chip, ChipProps } from '@mui/material';

interface TechChipProps extends Omit<ChipProps, 'label'> {
  label: string;
}

export function TechChip({ sx, ...rest }: TechChipProps) {
  return (
    <Chip
      size="small"
      sx={{
        backgroundColor: 'accent.light',
        color: 'primary.main',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontSize: { xs: '0.7rem', sm: '0.75rem' },
        height: { xs: '24px', sm: '28px' },
        fontWeight: 500,
        ...sx,
      }}
      {...rest}
    />
  );
}
