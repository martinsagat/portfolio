'use client';

import { Box, Container, Typography, Avatar, Chip, Stack, Button, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import JobModal from './JobModal';

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
        pt: 0,
        pb: { xs: 8, md: 12 },
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
        
        {/* Timeline Container */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: { xs: '100%', md: '800px' },
            mx: { xs: 0, md: 'auto' },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: { xs: '24px', md: '20%' },
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: 'divider',
              transform: { xs: 'none', md: 'translateX(-1px)' },
            },
          }}
        >
          <Stack spacing={{ xs: 4, md: 4 }}>
            {jobs.map((job, index) => (
              <TimelineItem key={index} job={job} index={index} isLast={index === jobs.length - 1} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function TimelineItem({ job, index, isLast }: { job: Job; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pl: { xs: 8, md: 0 },
        }}
      >
        {/* Timeline Dot */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '16px', md: '20%' },
            top: { xs: '8px', md: '32px' },
            transform: { xs: 'none', md: 'translateX(-50%)' },
            zIndex: 2,
            width: { xs: '16px', md: '20px' },
            height: { xs: '16px', md: '20px' },
            borderRadius: '50%',
            backgroundColor: 'background.paper',
            border: '3px solid',
            borderColor: 'primary.main',
            boxShadow: `0 0 0 4px ${theme.palette.mode === 'light' ? '#f8f9fa' : theme.palette.background.paper}`,
          }}
        />

        {/* Company Card - All on right side on desktop, positioned relative to timeline */}
        <Box
          sx={{
            width: { xs: '100%', md: 'calc(80% - 40px)' },
            ml: { xs: 0, md: '20%' },
            mr: { xs: 0, md: 0 },
            pr: { xs: 0, md: 0 },
            pl: { xs: 0, md: 4 },
            textAlign: { xs: 'left', md: 'left' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: 'background.paper',
              borderRadius: 8,
              p: { xs: 3, md: 4 },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* See More Button - Top Right Corner */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: 12, md: 16 },
                right: { xs: 12, md: 16 },
                zIndex: 1,
              }}
            >
              <Button
                onClick={() => setOpen(true)}
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
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'background.paper',
                  },
                }}
              >
                See More
              </Button>
            </Box>

            {/* Header Section - Logo and Company Info */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                mb: 3,
                alignItems: 'flex-start',
              }}
            >
              {/* Company Logo */}
              {job.logo && (
                <Avatar
                  variant="circular"
                  sx={{
                    width: { xs: 56, md: 72 },
                    height: { xs: 56, md: 72 },
                    backgroundColor: 'background.paper',
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={job.logo}
                    alt={job.company}
                    width={72}
                    height={72}
                    style={{ objectFit: 'contain', borderRadius: '50%' }}
                  />
                </Avatar>
              )}

              {/* Company Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Company Name */}
                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.main',
                    mb: 0.5,
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
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
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {job.company}
                  </Box>
                </Typography>

                {/* Job Title */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 500,
                    color: 'text.secondary',
                    lineHeight: 1.4,
                  }}
                >
                  {job.title}
                </Typography>

                {/* Date */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    mb: job.location ? 1 : 0,
                  }}
                >
                  {job.range}
                </Typography>

                {/* Location */}
                {job.location && (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                  >
                    <LocationOnIcon sx={{ fontSize: '0.875rem', color: 'text.secondary', opacity: 0.8 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                      }}
                    >
                      {job.location}
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Box>

            {/* Technologies Footer */}
            {job.tech && job.tech.length > 0 && (
              <Box
                sx={{
                  mt: 3,
                  pt: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  gap={1}
                  sx={{
                    justifyContent: 'center',
                  }}
                >
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
          </Box>
        </Box>
      </Box>

      {/* Job Description Modal */}
      <JobModal open={open} onClose={() => setOpen(false)} job={job} />
    </>
  );
}

