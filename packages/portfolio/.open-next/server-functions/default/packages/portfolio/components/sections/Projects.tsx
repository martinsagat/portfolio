'use client';

import { Box, Container, Typography, Card, CardContent, Stack, Chip, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';
import { useState, useEffect } from 'react';

interface Project {
  title: string;
  date: string;
  github?: string;
  external?: string;
  tech: string[];
  showInProjects?: boolean;
  htmlContent: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 9)));
  }, []);

  const displayedProjects = projects;

  return (
    <Box
      component="section"
      id="projects"
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
          Noteworthy Projects
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 6,
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          Due to rights and confidentiality agreements, certain commercial projects are not featured.
        </Typography>
      </Container>
    </Box>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <FolderIcon sx={{ color: 'primary.main', fontSize: 30 }} />
          <Stack direction="row" spacing={1}>
            {project.github && (
              <IconButton
                component={Link}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
            {project.external && (
              <IconButton
                component={Link}
                href={project.external}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Box>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {project.external ? (
            <Link href={project.external} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: project.htmlContent }}
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: '14px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '& p': {
              margin: 0,
            },
          }}
        />
        {project.tech && (
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mt: 'auto' }}>
            {project.tech.map((tech: string, i: number) => (
              <Chip
                key={i}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'accent.light',
                  color: 'primary.main',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '11px',
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

