'use client';

import { Box, Container, IconButton, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import { config } from '@/lib/config';

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
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {iconMap[social.name]}
              </IconButton>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Martin Sagat. Built with Next.js and MUI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


