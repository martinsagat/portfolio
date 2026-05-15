import { Box, Stack } from '@mui/material';
import { getJobs } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';
import { JobTimelineItem } from './JobTimelineItem';

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <Section id="jobs" background="subtle" noTopPadding>
      <SectionTitle>Where I&apos;ve Worked</SectionTitle>
      <Box
        sx={{
          position: 'relative',
          maxWidth: { xs: '100%', md: '800px' },
          mx: { xs: 0, md: 'auto' },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: { xs: '24px', md: '10%' },
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'divider',
            transform: { xs: 'none', md: 'translateX(-1px)' },
          },
        }}
      >
        <Stack spacing={4}>
          {jobs.map((job, i) => (
            <JobTimelineItem key={i} job={job} />
          ))}
        </Stack>
      </Box>
    </Section>
  );
}
