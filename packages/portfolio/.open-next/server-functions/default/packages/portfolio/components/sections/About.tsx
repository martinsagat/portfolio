import { Avatar, Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Section } from '@/components/ui';

export default function About() {
  return (
    <Section id="about" background="subtle" sx={{ userSelect: 'none' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Avatar
            sx={{
              width: { xs: 180, md: 250 },
              height: { xs: 180, md: 250 },
              position: 'relative',
              zIndex: 10,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          >
            <Image
              src="/me.jpg"
              alt="Martin Sagat"
              fill
              sizes="(max-width: 600px) 180px, 250px"
              style={{ objectFit: 'cover' }}
              draggable={false}
              priority
            />
          </Avatar>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h2" sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
            About Me
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', textAlign: { xs: 'center', md: 'left' } }}
          >
            I&apos;m a Senior Software Engineer specializing in scalable web and mobile applications.
            I blend cloud and modern web expertise with AI-augmented engineering workflows
            (Claude Code, Cursor, MCP) and hands-on AI product integration to ship efficient,
            maintainable systems faster without sacrificing quality. I&apos;m also passionate about
            crafting clean, intuitive UI/UX that elevates every product I work on.
          </Typography>
        </Box>
      </Stack>
    </Section>
  );
}
