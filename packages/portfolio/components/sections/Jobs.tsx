'use client';

import { Box, Container, Typography, Card, CardContent, Avatar, Chip, Stack, Collapse, IconButton, Button, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Job {
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  logo: string;
  tech: string[];
  date: string;
  htmlContent: string;
}

export default function Jobs() {
  const theme = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <Box
      component="section"
      id="jobs"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : 'background.paper',
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
          Where I've Worked
        </Typography>
        <Stack spacing={3}>
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

function JobCard({ job }: { job: Job }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: 'none',
        '&:hover': {
          borderColor: 'divider',
          transform: 'none',
          boxShadow: 'none',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
        {/* Two Column Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
            gap: { xs: 3, md: 4.5 },
            mb: { xs: 3, md: 4 },
          }}
        >
          {/* Left Side - Company Info */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar
              variant="circular"
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                backgroundColor: 'background.paper',
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                mb: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {job.logo && (
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={100}
                  height={100}
                  style={{ objectFit: 'contain', borderRadius: '50%' }}
                />
              )}
            </Avatar>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'primary.main', 
                mb: 0.75, 
                fontSize: { xs: '1.4rem', md: '1.75rem' }, 
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              <Box 
                component="a" 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: 'inherit', 
                  textDecoration: 'none',
                }}
              >
                {job.company}
              </Box>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 1.5, 
                fontSize: { xs: '0.95rem', md: '1.05rem' }, 
                fontWeight: 500,
                color: 'text.secondary',
              }}
            >
              {job.title}
            </Typography>
            <Stack 
              direction="column"
              spacing={1}
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary', 
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {job.range}
              </Typography>
              {job.location && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LocationOnIcon sx={{ fontSize: '0.875rem', color: 'text.secondary', opacity: 0.8 }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                    }}
                  >
                    {job.location}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Right Side - Experience Points */}
          <Box sx={{ minWidth: 0 }}>
            <Collapse 
              in={expanded} 
              collapsedSize={180}
              sx={{
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Box
                sx={{
                  pr: 1,
                  '& *': {
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  },
                }}
              >
                <Box
                  dangerouslySetInnerHTML={{ __html: job.htmlContent }}
                  sx={{
                    '& p': {
                      mb: 3,
                      color: 'text.primary',
                      lineHeight: 1.85,
                      fontSize: '1.05rem',
                      fontWeight: 400,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      letterSpacing: '-0.01em',
                      '&:last-child': {
                        mb: 0,
                      },
                    },
                    '& ul': {
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      '& li': {
                        position: 'relative',
                        paddingLeft: 3.5,
                        mb: 3,
                        color: 'text.primary',
                        lineHeight: 2,
                        fontSize: '1.1rem',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        maxWidth: '100%',
                        display: 'block',
                        letterSpacing: '-0.01em',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0.5,
                          top: '0.75em',
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                        },
                        '&:last-child': {
                          mb: 0,
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Collapse>
            
            {/* Expand Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                onClick={() => setExpanded(!expanded)}
                endIcon={
                  <ExpandMoreIcon 
                    sx={{ 
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                    }} 
                  />
                }
                sx={{
                  color: 'primary.main',
                  border: '1.5px solid',
                  borderColor: 'primary.main',
                  borderRadius: '999px',
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {expanded ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* Technologies Section - Full Width */}
        {job.tech && job.tech.length > 0 && (
          <Box 
            sx={{ 
              mt: 3, 
              pt: 3, 
              borderTop: '1px solid', 
              borderColor: 'divider',
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 1.5, 
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Technologies
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {job.tech.map((tech: string, i: number) => (
                <Chip
                  key={i}
                  label={tech}
                  size="small"
                  sx={{
                    backgroundColor: 'accent.light',
                    color: 'primary.main',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                    fontSize: '0.75rem',
                    height: '28px',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

