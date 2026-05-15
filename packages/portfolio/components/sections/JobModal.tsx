'use client';

import { Box, Typography, Avatar, Stack, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import { OutlinedCTAButton, TechChip } from '@/components/ui';
import type { Job } from '@/lib/content';

interface JobModalProps {
  open: boolean;
  onClose: () => void;
  job: Job;
}

export default function JobModal({ open, onClose, job }: JobModalProps) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableScrollLock={false}
      sx={{
        '& .MuiDialog-container': {
          padding: { xs: 0, sm: 2 },
          alignItems: { xs: 'flex-end', sm: 'center' },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: { xs: '16px 16px 0 0', sm: 3 },
          maxHeight: { xs: '100dvh', sm: '90vh' },
          height: { xs: '100dvh', sm: 'auto' },
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: theme.customShadows.modal,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pb: { xs: 1.5, sm: 2 },
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ flex: 1, pr: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          {/* Company Logo */}
          {job.logo && (
            <Avatar
              variant="circular"
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'background.paper',
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                boxShadow: theme.customShadows.card,
                flexShrink: 0,
              }}
            >
              <Image
                src={job.logo}
                alt={`${job.company} logo`}
                width={48}
                height={48}
                style={{ objectFit: 'contain', borderRadius: '50%' }}
              />
            </Avatar>
          )}
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Company Name */}
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main', 
                mb: 0.5,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
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
                color: 'text.secondary',
                mb: 1,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {job.title}
            </Typography>

            {/* Date and Location - Inline */}
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Typography variant="captionMono" component="span" sx={{ color: 'primary.main' }}>
                {job.range}
              </Typography>
              {job.location && (
                <Stack direction="row" spacing={0.5} alignItems="center">
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
            </Stack>
          </Box>
        </Box>
        
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'action.hover',
              color: 'text.primary',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          px: { xs: 2, sm: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          '& *': {
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          },
        }}
      >
        {/* Job Description */}
        <Box
          dangerouslySetInnerHTML={{ __html: job.htmlContent }}
          sx={{
            mb: job.tech && job.tech.length > 0 ? { xs: 3, sm: 4 } : 0,
            my: { xs: 2, sm: 4 },
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

        {/* Technologies Section */}
        {job.tech && job.tech.length > 0 && (
          <Box
            sx={{
              pt: { xs: 2, sm: 3 },
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Technologies Used
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {job.tech.map((tech: string, i: number) => (
                <TechChip key={i} label={tech} />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions 
        sx={{ 
          px: { xs: 2, sm: 4 }, 
          py: { xs: 2, sm: 3 },
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <OutlinedCTAButton onClick={onClose} size="small" sx={{ px: 2, py: 0.75, fontWeight: 500 }}>
          Close
        </OutlinedCTAButton>
      </DialogActions>
    </Dialog>
  );
}

