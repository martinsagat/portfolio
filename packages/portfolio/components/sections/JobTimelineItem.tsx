'use client';

import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import Image from 'next/image';
import JobModal from './JobModal';
import { OutlinedCTAButton, Reveal, TechChip } from '@/components/ui';
import type { Job } from '@/lib/content';

export function JobTimelineItem({ job, index = 0 }: { job: Job; index?: number }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Reveal delay={Math.min(index, 5) * 90} sx={{ position: 'relative', pl: { xs: 8, md: 0 } }}>
        {/* Timeline Dot */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '16px', md: '10%' },
            top: { xs: '8px', md: '32px' },
            transform: { xs: 'none', md: 'translateX(-50%)' },
            zIndex: 2,
            width: { xs: '16px', md: '20px' },
            height: { xs: '16px', md: '20px' },
            borderRadius: '50%',
            backgroundColor: 'background.paper',
            border: '3px solid',
            borderColor: 'primary.main',
            boxShadow: `0 0 0 4px ${theme.palette.background.subtle}`,
          }}
        />

        <Box
          sx={{
            width: { xs: '100%', md: 'calc(90% - 40px)' },
            ml: { xs: 0, md: '10%' },
            pl: { xs: 0, md: 4 },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: 'background.elevated',
              borderRadius: 8,
              p: { xs: 2.5, sm: 3, md: 4 },
              boxShadow: theme.customShadows.card,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.customShadows.cardHover,
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* Header — Logo + Company Info */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 3 },
                mb: 3,
                alignItems: 'flex-start',
              }}
            >
              {job.logo && (
                <Avatar
                  variant="circular"
                  sx={{
                    width: { xs: 48, sm: 56, md: 72 },
                    height: { xs: 48, sm: 56, md: 72 },
                    backgroundColor: 'background.paper',
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: '50%',
                    boxShadow: theme.customShadows.card,
                    flexShrink: 0,
                    '& img': { width: '100%', height: '100%', objectFit: 'contain' },
                  }}
                >
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={72}
                    height={72}
                    style={{ objectFit: 'contain', borderRadius: '50%', width: '100%', height: '100%' }}
                  />
                </Avatar>
              )}

              <Box sx={{ flex: 1, minWidth: 0, width: { xs: '100%', sm: 'auto' } }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.main',
                    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.375rem' },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 0.5,
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
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {job.company}
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '1rem' },
                    fontWeight: 500,
                    color: 'text.secondary',
                    lineHeight: 1.4,
                  }}
                >
                  {job.title}
                </Typography>

                <Typography
                  variant="captionMono"
                  component="div"
                  sx={{ color: 'primary.main', mb: job.location ? 1 : 0 }}
                >
                  {job.range}
                </Typography>

                {job.location && (
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                    <LocationOnIcon
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: 'text.secondary', opacity: 0.8 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      }}
                    >
                      {job.location}
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Box>

            {/* Footer — Tech chips (optional) + See More */}
            <Box
              sx={{
                mt: { xs: 2, sm: 3 },
                pt: { xs: 2, sm: 3 },
                pb: { xs: 0.5, sm: 1 },
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              {job.tech && job.tech.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  gap={1}
                  sx={{
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                    mb: 2,
                  }}
                >
                  {job.tech.map((tech, i) => (
                    <TechChip key={i} label={tech} />
                  ))}
                </Stack>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <OutlinedCTAButton
                  onClick={() => setOpen(true)}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 0.75, sm: 1 },
                    fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                    fontWeight: 500,
                    minWidth: { xs: '120px', sm: '140px' },
                  }}
                >
                  See More
                </OutlinedCTAButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Reveal>

      <JobModal open={open} onClose={() => setOpen(false)} job={job} />
    </>
  );
}
