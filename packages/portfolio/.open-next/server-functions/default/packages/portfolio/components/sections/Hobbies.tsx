'use client';

import { Box, Container, Typography, Card, CardContent, useTheme } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Hobby {
  title: string;
  htmlContent: string;
  images: string[];
}

export default function Hobbies() {
  const theme = useTheme();
  const [hobbies, setHobbies] = useState<Hobby[]>([]);

  useEffect(() => {
    fetch('/api/hobbies')
      .then((res) => res.json())
      .then((data) => setHobbies(data));
  }, []);

  return (
    <Box
      component="section"
      id="interests"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : 'background.paper',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>
          Things I enjoy
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index} hobby={hobby} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: 'none',
        userSelect: 'none',
        '&:hover': {
          borderColor: 'divider',
          transform: 'none',
          boxShadow: 'none',
        },
      }}
    >
      <CardContent>
        {hobby.images && hobby.images.length > 0 && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 200,
              mb: 2,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={hobby.images[0]}
              alt={hobby.title}
              fill
              style={{ 
                objectFit: 'cover',
                objectPosition: hobby.title.toLowerCase() === 'climbing' ? 'top' : 'center'
              }}
            />
          </Box>
        )}
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          {hobby.title}
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: hobby.htmlContent }}
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            lineHeight: 1.6,
            '& p': {
              margin: 0,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

