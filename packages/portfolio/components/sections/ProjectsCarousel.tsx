'use client';

import { Box, Card, CardContent, Stack, Typography, IconButton, Link, Tooltip, Button, useTheme, alpha } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { TechChip } from '@/components/ui';
import { useThemeMode } from '@/theme/ThemeContext';
import type { Project } from '@/lib/content';

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const theme = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: false,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const singleProject = projects.length === 1;

  if (singleProject) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', px: { xs: 2, sm: 4, md: 6 } }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 560, md: 880 },
          }}
        >
          <ProjectCard project={projects[0]} variant="featured" />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', px: { xs: 4, sm: 6, md: 8 } }}>
      <Box
        sx={{ overflow: 'hidden', position: 'relative', px: { xs: 1, sm: 3, md: 4 } }}
        ref={emblaRef}
      >
        <Box sx={{ display: 'flex', gap: 3, py: 1 }}>
          {projects.map((project, i) => (
            <Box
              key={i}
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                [theme.breakpoints.up('sm')]: { flex: '0 0 calc(55% - 12px)' },
                [theme.breakpoints.up('md')]: { flex: '0 0 calc(38% - 16px)' },
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
        aria-label="Previous projects"
        sx={{
          position: 'absolute',
          left: { xs: 0, sm: -24, md: -24 },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'background.paper',
          boxShadow: 2,
          zIndex: 1,
          '&:hover': { backgroundColor: 'action.hover' },
          '&.Mui-disabled': { opacity: 0.3 },
          '& svg': { transform: 'translateX(4px)' },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next projects"
        sx={{
          position: 'absolute',
          right: { xs: 0, sm: -24, md: -24 },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'background.paper',
          boxShadow: 2,
          zIndex: 1,
          '&:hover': { backgroundColor: 'action.hover' },
          '&.Mui-disabled': { opacity: 0.3 },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

function ProjectCard({ project, variant = 'default' }: { project: Project; variant?: 'default' | 'featured' }) {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const heroImage = mode === 'dark' && project.imageDark ? project.imageDark : project.image;
  const description = project.content?.trim();
  const isFeatured = variant === 'featured' && !!heroImage;
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: isFeatured ? 'row' : 'column' },
        boxShadow: theme.customShadows.card,
        transition: 'all 0.3s ease',
        userSelect: 'none',
        '&:hover': {
          boxShadow: theme.customShadows.cardHover,
          transform: { xs: 'none', md: 'translateY(-2px)' },
        },
      }}
    >
      {isFeatured && heroImage && (
        <Box
          sx={{
            order: { xs: 0, md: 2 },
            position: 'relative',
            width: { xs: '100%', md: '40%' },
            minHeight: { xs: 260, sm: 320, md: 'auto' },
            backgroundColor: 'background.subtle',
            borderBottom: { xs: '1px solid', md: 'none' },
            borderColor: 'divider',
            flexShrink: 0,
          }}
        >
          <Image
            src={heroImage}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 900px) 100vw, 360px"
            style={{ objectFit: 'contain', padding: '16px' }}
          />
        </Box>
      )}
      <Box
        sx={{
          order: { xs: 1, md: 1 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1, md: 1.5 }, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 }, flex: 1, minWidth: 0 }}>
            {project.icon ? (
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 28, md: 36 },
                  height: { xs: 28, md: 36 },
                  flexShrink: 0,
                }}
              >
                <Image
                  src={project.icon}
                  alt={`${project.title} logo`}
                  fill
                  sizes="36px"
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            ) : (
              <FolderIcon sx={{ color: 'primary.main', fontSize: { xs: 28, md: 36 }, flexShrink: 0 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
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
                  aria-label="View on GitHub"
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
                  aria-label="View live site"
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
                '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                transition: 'all 0.2s ease',
              }}
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            sx={{
              mt: { xs: 1.5, md: 2 },
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
      {project.tech && project.tech.length > 0 && (
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
            sx={{ justifyContent: { xs: 'flex-start', sm: 'center' } }}
          >
            {project.tech.map((tech, i) => (
              <TechChip key={i} label={tech} />
            ))}
          </Stack>
        </Box>
      )}
      </Box>
    </Card>
  );
}
