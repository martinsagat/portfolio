'use client';

import { Box, Container, Typography, Card, CardContent, Stack, Chip, IconButton, Link, Tooltip, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : 'background.paper',
      }}
    >
      <Container 
        maxWidth="xl" 
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
              px: { xs: 1, sm: 3, md: 4 },
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
                      flex: '0 0 calc(55% - 12px)',
                    },
                    '@media (min-width: 900px)': {
                      flex: '0 0 calc(38% - 16px)',
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
              left: { xs: 0, sm: -24, md: -24 },
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
              '& svg': {
                transform: 'translateX(4px)',
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
              right: { xs: 0, sm: -24, md: -24 },
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
            userSelect: 'none',
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
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRadius: { xs: 6, md: 8 },
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        userSelect: 'none',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          transform: { xs: 'none', md: 'translateY(-2px)' },
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1, md: 1.5 }, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 }, flex: 1, minWidth: 0 }}>
            <FolderIcon sx={{ color: 'primary.main', fontSize: { xs: 28, md: 36 }, flexShrink: 0 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '12px', md: '13px' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {formatDate(project.date)}
            </Typography>
          </Box>
          <Stack direction="row" spacing={{ xs: 0.25, md: 0.5 }} sx={{ flexShrink: 0 }}>
            {project.github && (
              <Tooltip title="View on GitHub" arrow placement="top">
                <IconButton
                  component={Link}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'text.secondary',
                    padding: { xs: 0.75, md: 1 },
                    minWidth: { xs: 36, md: 48 },
                    height: { xs: 36, md: 48 },
                    '&:hover': { 
                      color: 'primary.main',
                      backgroundColor: 'action.hover',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <GitHubIcon sx={{ fontSize: { xs: 20, md: 32 } }} />
                </IconButton>
              </Tooltip>
            )}
            {project.external && (
              <Tooltip title="View live site" arrow placement="top">
                <IconButton
                  component={Link}
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'text.secondary',
                    padding: { xs: 0.75, md: 1 },
                    minWidth: { xs: 36, md: 48 },
                    height: { xs: 36, md: 48 },
                    '&:hover': { 
                      color: 'primary.main',
                      backgroundColor: 'action.hover',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: { xs: 20, md: 32 } }} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 0,
            fontWeight: 600,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' },
            lineHeight: { xs: 1.4, md: 1.2 },
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
      </CardContent>
      {project.tech && (
        <Box
          sx={{
            mt: { xs: 1.5, md: 2 },
            pt: { xs: 1.5, md: 2 },
            px: { xs: 2, md: 3 },
            mx: { xs: 2, md: 3 },
            mb: { xs: 2, md: 3 },
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack 
            direction="row" 
            spacing={{ xs: 0.5, md: 1 }} 
            flexWrap="wrap" 
            gap={{ xs: 0.5, md: 1 }}
            sx={{
              justifyContent: { xs: 'flex-start', sm: 'center' },
            }}
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
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  height: { xs: '24px', md: '28px' },
                  fontWeight: 500,
                  '& .MuiChip-label': {
                    px: { xs: 1, md: 1.5 },
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Card>
  );
}

