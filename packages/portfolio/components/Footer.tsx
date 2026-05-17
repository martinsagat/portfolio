'use client';

import { Box, Container, IconButton, Stack, Tooltip, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import { config } from '@/lib/config';

const LIGHTHOUSE_SCORES = [
  { label: 'Performance', value: 100 },
  { label: 'Accessibility', value: 100 },
  { label: 'Best Practices', value: 100 },
  { label: 'SEO', value: 100 },
];

const PAGESPEED_URL =
  'https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fmartinsagat.com';

function ScoreDot({ value, label }: { value: number; label: string }) {
  const tone =
    value >= 90 ? 'success' : value >= 50 ? 'warning' : 'error';
  const colorMap: Record<string, string> = {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };
  return (
    <Tooltip title={`${label}: ${value}`} arrow>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '1.5px solid',
          borderColor: colorMap[tone],
          color: colorMap[tone],
          fontSize: 11,
          fontWeight: 700,
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
        }}
      >
        {value}
      </Box>
    </Tooltip>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon />,
  Instagram: <InstagramIcon />,
  Twitter: <TwitterIcon />,
  Linkedin: <LinkedInIcon />,
  Codepen: <CodeIcon />,
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            {config.socialMedia.map((social) => (
              <IconButton
                key={social.name}
                component={Link}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name}`}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {iconMap[social.name]}
              </IconButton>
            ))}
          </Box>
          <Link
            href={PAGESPEED_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            aria-label="Verify Lighthouse scores on PageSpeed Insights"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.subtle',
              color: 'text.secondary',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <SpeedIcon fontSize="small" />
            <Typography
              component="span"
              sx={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
              }}
            >
              Lighthouse
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {LIGHTHOUSE_SCORES.map((s) => (
                <ScoreDot key={s.label} value={s.value} label={s.label} />
              ))}
            </Stack>
          </Link>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', md: 'center' } }}
          >
            © {new Date().getFullYear()} Martin Sagat. Built with Next.js and MUI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}







