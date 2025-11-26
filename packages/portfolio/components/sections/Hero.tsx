'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const technologies = [
  'html5', 'css3', 'js', 'node', 'react', 'graphql', 'laravel', 'net',
  'mysql', 'postgresql', 'mongodb', 'aws', 'azure', 'terraform', 'git', 'linux', 'postman'
];

export default function Hero() {
  const [techPositions, setTechPositions] = useState<Array<{ name: string; left: number; top: number; size: number }>>([]);

  useEffect(() => {
    const positions = technologies.map((tech, index) => {
      const colsPerRow = 4;
      const hexWidth = 90;
      const hexHeight = 95;
      const row = Math.floor(index / colsPerRow);
      const col = index % colsPerRow;
      const hexOffset = row % 2 === 1 ? 0.5 : 0;
      const randomX = (Math.random() - 0.5) * 10;
      const randomY = (Math.random() - 0.5) * 12;
      const left = 15 + (col + hexOffset) * hexWidth + randomX;
      const top = 15 + row * hexHeight * 0.92 + randomY;
      const size = 55 + Math.random() * 30;

      return { name: tech, left, top, size: Math.round(size) };
    });
    setTechPositions(positions);
  }, []);

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, rgba(10, 24, 46, 0) 0%, rgba(10, 24, 46, 0.3) 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(17, 34, 64, 0.3) 0%, transparent 50%)',
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontFamily: 'var(--font-geist-mono)',
                mb: 2,
                fontSize: { xs: '14px', md: '18px' },
              }}
            >
              Hi, my name is
            </Typography>
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                color: 'text.primary',
                fontWeight: 700,
              }}
            >
              Martin Sagat
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                color: 'text.primary',
              }}
            >
              I build things for the web.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.secondary',
                maxWidth: '600px',
                mx: { xs: 'auto', lg: 0 },
              }}
            >
              I'm a{' '}
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>
                Senior Software Engineer
              </Box>{' '}
              specializing in building scalable web and mobile applications. With expertise in cloud
              technologies and modern web frameworks, I create efficient, maintainable solutions that
              drive business growth.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{ 
                justifyContent: { xs: 'center', lg: 'flex-start' },
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                href="https://www.linkedin.com/in/martinsagat/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                  },
                }}
              >
                Connect on LinkedIn
              </Button>
              <Button
                variant="outlined"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                  },
                }}
              >
                View Resume
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: '300px', md: '500px' },
              display: { xs: 'none', lg: 'block' },
            }}
          >
            {techPositions.map((tech) => (
              <Box
                key={tech.name}
                sx={{
                  position: 'absolute',
                  left: `${tech.left}px`,
                  top: `${tech.top}px`,
                  width: `${tech.size}px`,
                  height: `${tech.size}px`,
                  borderRadius: '50%',
                  backgroundColor: 'background.paper',
                  border: '2px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 1,
                  zIndex: 1,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'accent.light',
                    transform: 'translateY(-8px) scale(1.1) rotate(2deg)',
                    zIndex: 5,
                  },
                }}
              >
                <Image
                  src={`/content/stack/${tech.name}.${tech.name === 'postman' ? 'svg' : 'png'}`}
                  alt={tech.name}
                  width={tech.size - 16}
                  height={tech.size - 16}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          sx={{ color: 'text.secondary' }}
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </Box>
      </Box>
    </Box>
  );
}

