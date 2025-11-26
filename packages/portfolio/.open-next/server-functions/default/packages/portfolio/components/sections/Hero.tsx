'use client';

import { Box, Container, Typography, Button, Stack, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeMode } from '@/theme/ThemeContext';

const technologies = [
  'html5', 'css3', 'js', 'node', 'react', 'graphql', 'laravel', 'net',
  'mysql', 'postgresql', 'terraform', 'git', 'linux', 'mongodb', 'aws', 'azure'
];

const getTechDisplayName = (tech: string): string => {
  const techNames: Record<string, string> = {
    'html5': 'HTML5',
    'css3': 'CSS3',
    'js': 'JavaScript',
    'node': 'Node.js',
    'react': 'React',
    'graphql': 'GraphQL',
    'laravel': 'Laravel',
    'net': '.NET',
    'mysql': 'MySQL',
    'postgresql': 'PostgreSQL',
    'terraform': 'Terraform',
    'git': 'Git',
    'linux': 'Linux',
    'mongodb': 'MongoDB',
    'aws': 'Amazon Web Services',
    'azure': 'Microsoft Azure',
  };
  return techNames[tech] || tech.toUpperCase();
};

export default function Hero() {
  const { mode } = useThemeMode();
  const [techPositions, setTechPositions] = useState<Array<{ name: string; left: number; top: number; size: number }>>([]);

  useEffect(() => {
    const fixedSize = 70; // Fixed size for all icons
    const colsPerRow = 4;
    const hexWidth = 90;
    const hexHeight = 95;
    const padding = 20;
    
    // Helper function to check if two circles overlap
    const circlesOverlap = (
      x1: number, y1: number, r1: number,
      x2: number, y2: number, r2: number
    ): boolean => {
      const dx = x1 - x2;
      const dy = y1 - y2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < (r1 + r2);
    };
    
    const positions: Array<{ name: string; left: number; top: number; size: number }> = [];
    
    technologies.forEach((tech, index) => {
      const row = Math.floor(index / colsPerRow);
      const col = index % colsPerRow;
      const hexOffset = row % 2 === 1 ? 0.5 : 0;
      let left = 15 + (col + hexOffset) * hexWidth;
      let top = 15 + row * hexHeight * 0.92;
      
      const iconRadius = fixedSize / 2;
      let iconCenterX = left + fixedSize / 2;
      let iconCenterY = top + fixedSize / 2;
      
      // Check for overlaps with already positioned tech icons
      let maxIterations = 20;
      let iteration = 0;
      while (iteration < maxIterations) {
        let hasOverlap = false;
        
        // Check overlaps with other tech icons
        for (const existingIcon of positions) {
          const existingCenterX = existingIcon.left + existingIcon.size / 2;
          const existingCenterY = existingIcon.top + existingIcon.size / 2;
          const existingRadius = existingIcon.size / 2;
          
          if (circlesOverlap(iconCenterX, iconCenterY, iconRadius, existingCenterX, existingCenterY, existingRadius)) {
            hasOverlap = true;
            // Calculate direction away from existing icon
            const dx = iconCenterX - existingCenterX;
            const dy = iconCenterY - existingCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = iconRadius + existingRadius + padding;
            
            if (distance > 0) {
              // Push icon away from existing icon
              const pushDistance = minDistance - distance;
              const pushX = (dx / distance) * pushDistance;
              const pushY = (dy / distance) * pushDistance;
              
              left += pushX;
              top += pushY;
              iconCenterX = left + fixedSize / 2;
              iconCenterY = top + fixedSize / 2;
            } else {
              // If exactly at center, push to the right
              left += minDistance;
              iconCenterX = left + fixedSize / 2;
            }
            break;
          }
        }
        
        if (!hasOverlap) break;
        iteration++;
      }

      positions.push({ name: tech, left, top, size: fixedSize });
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
        overflow: 'hidden',
        pl: { xs: 0, lg: 15 },
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
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
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
              mt: { lg: 20 },
            }}
          >
            {techPositions.map((tech) => (
              <Tooltip
                key={tech.name}
                title={getTechDisplayName(tech.name)}
                arrow
                placement="top"
              >
                <Box
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
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'accent.light',
                      transform: 'translateY(-8px) scale(1.1) rotate(2deg)',
                      zIndex: 5,
                    },
                  }}
                >
                  <Image
                    src={`/content/stack/${
                      tech.name === 'aws' && mode === 'light'
                        ? 'aws-light.png'
                        : `${tech.name}.png`
                    }`}
                    alt={tech.name}
                    width={tech.size - 16}
                    height={tech.size - 16}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              </Tooltip>
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

