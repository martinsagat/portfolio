import { Box, Container, Typography, Avatar, Stack } from '@mui/material';
import Image from 'next/image';

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
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
                border: '3px solid',
                borderColor: 'divider',
                position: 'relative',
                zIndex: 10,
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Image
                src="/me.jpg"
                alt="Martin Sagat"
                width={250}
                height={250}
                style={{ objectFit: 'cover' }}
              />
            </Avatar>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              About Me
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              As a skilled Software Engineer with a diverse experience in the Logistics, Marketing,
              and Healthcare industries, I am eager to continuously deliver impactful solutions and
              drive innovations. I'm highly adaptable, experimental and persistent in my approach to
              problem-solving. I always strive to find the meaning to my work by exploring the{' '}
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600, fontStyle: 'italic' }}>
                why
              </Box>{' '}
              behind the{' '}
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600, fontStyle: 'italic' }}>
                what
              </Box>{' '}
              and{' '}
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600, fontStyle: 'italic' }}>
                how
              </Box>
              .
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

