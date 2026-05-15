import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

type BackgroundVariant = 'default' | 'subtle';

interface SectionProps {
  id: string;
  children: ReactNode;
  background?: BackgroundVariant;
  maxWidth?: ContainerProps['maxWidth'];
  noTopPadding?: boolean;
  containerSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export function Section({
  id,
  children,
  background = 'default',
  maxWidth = 'lg',
  noTopPadding = false,
  containerSx,
  sx,
}: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        pt: noTopPadding ? 0 : { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        backgroundColor: background === 'subtle' ? 'background.subtle' : 'background.default',
        scrollMarginTop: { xs: '70px', md: '80px' },
        ...sx,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, ...containerSx }}
      >
        {children}
      </Container>
    </Box>
  );
}
