'use client';

import { Box, Container, Typography, Stack, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeMode } from '@/theme/ThemeContext';
import { OutlinedCTAButton } from '@/components/ui';

const technologies = [
  'html5', 'css3', 'js', 'node', 'react', 'graphql', 'laravel', 'net',
  'mysql', 'postgresql', 'terraform', 'git', 'linux', 'mongodb', 'aws', 'azure'
];

const aiTools = ['claude', 'cursor', 'mcp'];

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
    'claude': 'Claude Code',
    'cursor': 'Cursor',
    'mcp': 'Model Context Protocol',
  };
  return techNames[tech] || tech.toUpperCase();
};

export default function Hero() {
  const { mode } = useThemeMode();
  const [techPositions, setTechPositions] = useState<Array<{ name: string; left: number; top: number; size: number }>>([]);
  const [clusterBounds, setClusterBounds] = useState({ minLeft: 0, maxRight: 0 });

  useEffect(() => {
    const calculatePositions = () => {
      const isSmallScreen = window.innerWidth < 600;
      const fixedSize = isSmallScreen ? 50 : 70; // Smaller icons on mobile
      const colsPerRow = isSmallScreen ? 3 : 4;
      const hexWidth = isSmallScreen ? 70 : 90;
      const hexHeight = isSmallScreen ? 75 : 95;
      const padding = isSmallScreen ? 15 : 20;
      
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
      
      // On small screens, show only 15 icons (5 rows of 3) by excluding the last one
      const techsToShow = isSmallScreen ? technologies.slice(0, -1) : technologies;
      
      techsToShow.forEach((tech, index) => {
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
      
      // Calculate cluster bounds for centering on small screens
      if (positions.length > 0) {
        const minLeft = Math.min(...positions.map(p => p.left));
        const maxRight = Math.max(...positions.map(p => p.left + p.size));
        // Add extra padding to ensure icons aren't cut off
        const padding = isSmallScreen ? 20 : 30;
        setClusterBounds({ minLeft: Math.max(0, minLeft - padding), maxRight: maxRight + padding });
      }
      
      setTechPositions(positions);
    };

    calculatePositions();

    let raf = 0;
    const handleResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calculatePositions);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'center',
        position: 'relative',
        pt: { xs: 10, md: 8 },
        pb: { xs: 0, lg: '10vh' },
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          mx: 'auto',
          px: { xs: 1, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 4,
            alignItems: 'start',
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
                ml: { lg: 0.5 },
                fontSize: { xs: '14px', md: '18px' },
                userSelect: 'none',
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
                userSelect: 'none',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
              }}
            >
              Martin Sagat
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                color: 'text.primary',
                userSelect: 'none',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
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
                px: { xs: 2, sm: 0 },
                userSelect: 'none',
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
              <OutlinedCTAButton
                href="https://www.linkedin.com/in/martinsagat/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </OutlinedCTAButton>
              <OutlinedCTAButton
                href="/static/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </OutlinedCTAButton>
            </Stack>
          </Box>
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: '300px', md: '500px' },
              mt: { xs: 2, lg: 4 },
              ml: { xs: 0 },
              mb: { xs: 4, md: 0 },
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              overflow: { xs: 'visible', sm: 'visible', md: 'hidden' },
              px: { xs: 1, sm: 2 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: clusterBounds.maxRight > 0 ? `${clusterBounds.maxRight}px` : 'auto',
                maxWidth: { xs: '100%', md: 'none' },
                margin: { xs: '0 auto', lg: 0 },
                transform: {
                  xs: clusterBounds.minLeft > 0
                    ? `translateX(${Math.max(0, -clusterBounds.minLeft)}px)`
                    : 'none',
                  lg: 'none'
                },
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
                    draggable={false}
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
                      alt={`${getTechDisplayName(tech.name)} logo`}
                      width={tech.size - 16}
                      height={tech.size - 16}
                      style={{ objectFit: 'contain' }}
                      draggable={false}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: { xs: 4, md: 5 },
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, sm: 4, md: 5 },
            width: '100%',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              fontWeight: 600,
              letterSpacing: '0.2em',
              fontSize: { xs: '12px', md: '13px' },
              userSelect: 'none',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Built with AI · Force Multiplier
          </Typography>
          <Stack direction="row" spacing={{ xs: 2, md: 2.5 }}>
            {aiTools.map((tool) => {
              const size = 64;
              return (
                <Tooltip
                  key={tool}
                  title={getTechDisplayName(tool)}
                  arrow
                  placement="top"
                >
                  <Box
                    draggable={false}
                    sx={{
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      backgroundColor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      boxShadow: (theme) =>
                        `0 0 0 4px ${theme.palette.primary.main}1A`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 1,
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: (theme) =>
                          `0 0 0 6px ${theme.palette.primary.main}33`,
                        transform: 'translateY(-6px) scale(1.08)',
                      },
                    }}
                  >
                    <Image
                      src={`/content/stack/${tool}.png`}
                      alt={`${getTechDisplayName(tool)} logo`}
                      width={size - 16}
                      height={size - 16}
                      style={{ objectFit: 'contain' }}
                      draggable={false}
                    />
                  </Box>
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
      </Container>
      <Box
        aria-hidden="true"
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

