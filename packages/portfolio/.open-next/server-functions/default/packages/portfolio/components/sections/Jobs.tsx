'use client';

import { Box, Container, Typography, Card, CardContent, Avatar, Chip, Stack, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
        backgroundColor: 'background.paper',
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
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, pb: 2, borderBottom: '2px solid', borderColor: 'divider' }}>
          <Avatar
            variant="rounded"
            sx={{
              width: 80,
              height: 80,
              backgroundColor: 'background.paper',
              border: '2px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'accent.light',
              },
            }}
          >
            {job.logo && (
              <Image
                src={job.logo}
                alt={job.company}
                width={64}
                height={64}
                style={{ objectFit: 'contain' }}
              />
            )}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ mb: 0.5 }}>
              {job.title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5 }}>
              @{' '}
              <Box component="a" href={job.url} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                {job.company}
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'var(--font-geist-mono)' }}>
              {job.range}
            </Typography>
          </Box>
        </Box>
        <Collapse in={expanded} collapsedSize={200}>
          <Box
            dangerouslySetInnerHTML={{ __html: job.htmlContent }}
            sx={{
              '& p': {
                mb: 1.5,
                color: 'text.secondary',
              },
              '& ul': {
                listStyle: 'none',
                padding: 0,
                '& li': {
                  position: 'relative',
                  paddingLeft: 2,
                  mb: 1,
                  color: 'text.secondary',
                  '&::before': {
                    content: '"▹"',
                    position: 'absolute',
                    left: 0,
                    color: 'primary.main',
                  },
                },
              },
            }}
          />
        </Collapse>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              color: 'primary.main',
              border: '2px solid',
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'background.default',
              },
            }}
          >
            <ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
          </IconButton>
        </Box>
        {job.tech && (
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mt: 2, pt: 2, borderTop: '2px solid', borderColor: 'divider' }}>
            {job.tech.map((tech: string, i: number) => (
              <Chip
                key={i}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'accent.light',
                  color: 'primary.main',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '12px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                  },
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

