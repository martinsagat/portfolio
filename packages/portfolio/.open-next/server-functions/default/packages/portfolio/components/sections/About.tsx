'use client';

import { Box, Container, Typography, Avatar, Stack, useTheme } from '@mui/material';
import Image from 'next/image';

export default function About() {
  const theme = useTheme();
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : 'background.default',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Avatar
              sx={{
                width: { xs: 180, md: 250 },
                height: { xs: 180, md: 250 },
                position: 'relative',
                zIndex: 10,
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Image
                src="/me.jpg"
                alt="Martin Sagat"
                fill
                sizes="(max-width: 600px) 180px, 250px"
                style={{ objectFit: 'cover' }}
              />
            </Avatar>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
              About Me
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', textAlign: { xs: 'center', md: 'left' } }}>
            I'm a Senior Software Engineer specializing in scalable web and mobile applications. I blend cloud and modern web expertise with hands-on AI integration to build efficient, maintainable systems that enhance user experiences and drive business impact. I'm also passionate about crafting clean, intuitive UI/UX that elevates every product I work on.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

