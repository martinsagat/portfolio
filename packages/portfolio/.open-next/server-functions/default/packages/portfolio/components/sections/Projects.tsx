import { Typography } from '@mui/material';
import { getProjects } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';
import { ProjectsCarousel } from './ProjectsCarousel';

export default async function Projects() {
  const projects = (await getProjects()).slice(0, 9);
  return (
    <Section id="projects" maxWidth="xl">
      <SectionTitle>Noteworthy Projects</SectionTitle>
      <ProjectsCarousel projects={projects} />
      <Typography
        variant="body2"
        sx={{
          mt: 6,
          textAlign: 'center',
          fontStyle: 'italic',
          color: 'text.secondary',
          userSelect: 'none',
        }}
      >
        Due to rights and confidentiality agreements, certain commercial projects are not featured.
      </Typography>
    </Section>
  );
}
