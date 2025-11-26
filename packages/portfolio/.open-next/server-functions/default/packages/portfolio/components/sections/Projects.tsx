'use client';

import { Box, Container, Typography, Card, CardContent, Stack, Chip, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    loop: false,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 9)));
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

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
        
        <Box sx={{ position: 'relative', px: { xs: 4, sm: 6, md: 8 } }}>
          <Box
            sx={{
              overflow: 'hidden',
              position: 'relative',
            }}
            ref={emblaRef}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                py: 1,
              }}
            >
              {displayedProjects.map((project, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '0 0 100%',
                    minWidth: 0,
                    '@media (min-width: 600px)': {
                      flex: '0 0 calc(50% - 12px)',
                    },
                    '@media (min-width: 900px)': {
                      flex: '0 0 calc(33.333% - 16px)',
                    },
                  }}
                >
                  <ProjectCard project={project} />
                </Box>
              ))}
            </Box>
          </Box>

          <IconButton
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            sx={{
              position: 'absolute',
              left: { xs: -16, sm: -24 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'background.paper',
              boxShadow: 2,
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <IconButton
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            sx={{
              position: 'absolute',
              right: { xs: -16, sm: -24 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'background.paper',
              boxShadow: 2,
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
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
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'divider',
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <FolderIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Stack direction="row" spacing={0.5}>
            {project.github && (
              <IconButton
                component={Link}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                sx={{ 
                  color: 'text.secondary', 
                  '&:hover': { 
                    color: 'primary.main',
                    backgroundColor: 'action.hover',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <GitHubIcon sx={{ fontSize: 32 }} />
              </IconButton>
            )}
            {project.external && (
              <IconButton
                component={Link}
                href={project.external}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                sx={{ 
                  color: 'text.secondary', 
                  '&:hover': { 
                    color: 'primary.main',
                    backgroundColor: 'action.hover',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 32 }} />
              </IconButton>
            )}
          </Stack>
        </Box>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 0.5,
            fontWeight: 600,
            transition: 'color 0.2s ease',
          }}
        >
          {project.external ? (
            <Link 
              href={project.external} 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ 
                color: 'inherit', 
                textDecoration: 'none', 
                '&:hover': { 
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            color: 'text.secondary',
            fontSize: '13px',
          }}
        >
          {formatDate(project.date)}
        </Typography>
        {project.tech && (
          <Stack 
            direction="row" 
            spacing={1} 
            flexWrap="wrap" 
            gap={1}
          >
            {project.tech.map((tech: string, i: number) => (
              <Chip
                key={i}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'accent.light',
                  color: 'primary.main',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: '11px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                    transform: 'translateY(-1px)',
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

