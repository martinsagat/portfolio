'use client';

import {
  Box,
  ButtonBase,
  Dialog,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import ChatIcon from '@mui/icons-material/Chat';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useThemeMode } from '@/theme/ThemeContext';

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: 'Navigate' | 'Actions' | 'External';
  keywords?: string;
  icon: React.ReactNode;
  perform: () => void;
}

const dispatchAskMartin = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ask-martin:open'));
  }
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }
};

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  const commands = useMemo<Command[]>(() => {
    return [
      {
        id: 'nav-about',
        label: 'Go to About',
        group: 'Navigate',
        keywords: 'about bio profile',
        icon: <PersonIcon fontSize="small" />,
        perform: () => scrollToSection('about'),
      },
      {
        id: 'nav-jobs',
        label: 'Go to Experience',
        group: 'Navigate',
        keywords: 'experience work jobs career',
        icon: <WorkIcon fontSize="small" />,
        perform: () => scrollToSection('jobs'),
      },
      {
        id: 'nav-projects',
        label: 'Go to Projects',
        group: 'Navigate',
        keywords: 'projects portfolio work',
        icon: <CodeIcon fontSize="small" />,
        perform: () => scrollToSection('projects'),
      },
      {
        id: 'nav-blog',
        label: 'Go to Blog',
        group: 'Navigate',
        keywords: 'blog articles posts writing',
        icon: <ArticleIcon fontSize="small" />,
        perform: () => scrollToSection('blog'),
      },
      {
        id: 'nav-interests',
        label: 'Go to Interests',
        group: 'Navigate',
        keywords: 'interests hobbies fun',
        icon: <FavoriteIcon fontSize="small" />,
        perform: () => scrollToSection('interests'),
      },
      {
        id: 'nav-contact',
        label: 'Go to Contact',
        group: 'Navigate',
        keywords: 'contact email message',
        icon: <EmailIcon fontSize="small" />,
        perform: () => scrollToSection('contact'),
      },
      {
        id: 'action-resume',
        label: 'Download Resume',
        hint: 'PDF',
        group: 'Actions',
        keywords: 'resume cv pdf download',
        icon: <DownloadIcon fontSize="small" />,
        perform: () => openExternal('/static/resume.pdf'),
      },
      {
        id: 'action-ask-martin',
        label: 'Ask Martin AI',
        hint: 'Chat',
        group: 'Actions',
        keywords: 'ai chat ask question martin',
        icon: <ChatIcon fontSize="small" />,
        perform: dispatchAskMartin,
      },
      {
        id: 'action-toggle-theme',
        label: mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        group: 'Actions',
        keywords: 'theme dark light mode toggle',
        icon: mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />,
        perform: () => toggleMode(),
      },
      {
        id: 'ext-linkedin',
        label: 'Open LinkedIn',
        group: 'External',
        keywords: 'linkedin social',
        icon: <LinkedInIcon fontSize="small" />,
        perform: () => openExternal('https://www.linkedin.com/in/martinsagat/'),
      },
      {
        id: 'ext-github',
        label: 'Open GitHub',
        group: 'External',
        keywords: 'github code source',
        icon: <GitHubIcon fontSize="small" />,
        perform: () => openExternal('https://github.com/martinsagat'),
      },
      {
        id: 'ext-email',
        label: 'Email Martin',
        group: 'External',
        keywords: 'email contact mailto',
        icon: <EmailIcon fontSize="small" />,
        perform: () => {
          window.location.href = 'mailto:martin.sagat@outlook.com.au';
        },
      },
    ];
  }, [mode, toggleMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [commands, query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash =
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLElement && e.target.isContentEditable);
      if (isCmdK || isSlash) {
        e.preventDefault();
        setActiveIndex(0);
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const runCommand = useCallback((cmd: Command) => {
    setOpen(false);
    setQuery('');
    setTimeout(() => cmd.perform(), 50);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) runCommand(cmd);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const node = listRef.current.querySelector<HTMLElement>(
      `[data-cmd-index="${activeIndex}"]`
    );
    if (node) node.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  let lastGroup = '';

  return (
    <>
      <Tooltip title="Search & navigate (⌘K)" placement="right" arrow>
        <ButtonBase
          aria-label="Open command palette (Cmd or Ctrl + K)"
          onClick={() => {
            setActiveIndex(0);
            setOpen(true);
          }}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
            zIndex: 1200,
            height: 44,
            width: { xs: 44, sm: 'auto' },
            minWidth: { xs: 44, sm: 200 },
            px: { xs: 0, sm: 1.5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            gap: 1.25,
            borderRadius: { xs: '50%', sm: 999 },
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            boxShadow: theme.customShadows.card,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'background.elevated',
              color: 'primary.main',
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
              boxShadow: theme.customShadows.cardHover,
            },
          }}
        >
          <SearchIcon fontSize="small" sx={{ flexShrink: 0 }} />
          <Typography
            component="span"
            sx={{
              display: { xs: 'none', sm: 'inline' },
              flexGrow: 1,
              textAlign: 'left',
              fontSize: 13,
              color: 'text.secondary',
              userSelect: 'none',
            }}
          >
            Search…
          </Typography>
          <Box
            component="span"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              gap: 0.25,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              px: 0.75,
              py: 0.1,
              backgroundColor: 'background.subtle',
              color: 'text.secondary',
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 11,
              lineHeight: 1.4,
            }}
          >
            ⌘K
          </Box>
        </ButtonBase>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionProps={{
          onEntered: () => inputRef.current?.focus(),
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            mt: { xs: 4, sm: 12 },
            alignSelf: 'flex-start',
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          },
        }}
        sx={{
          '& .MuiDialog-container': { alignItems: 'flex-start' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary' }} fontSize="small" />
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands…"
            fullWidth
            sx={{ fontSize: '15px', color: 'text.primary' }}
            inputProps={{ 'aria-label': 'Command search' }}
          />
          <Typography
            variant="caption"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              px: 0.75,
              py: 0.25,
              color: 'text.secondary',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
              fontSize: '11px',
            }}
          >
            ESC
          </Typography>
        </Box>

        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <Box sx={{ px: 3, py: 4, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="body2">No matches found</Typography>
            </Box>
          ) : (
            <List ref={listRef} sx={{ py: 0 }}>
              {filtered.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;
                const active = i === activeIndex;
                return (
                  <Box key={cmd.id}>
                    {showGroup && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          px: 2,
                          pt: 1.5,
                          pb: 0.5,
                          color: 'text.secondary',
                          fontFamily:
                            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                          fontSize: '11px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {cmd.group}
                      </Typography>
                    )}
                    <ListItemButton
                      data-cmd-index={i}
                      selected={active}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => runCommand(cmd)}
                      sx={{
                        mx: 1,
                        borderRadius: 2,
                        '&.Mui-selected': {
                          backgroundColor: 'accent.light',
                        },
                        '&.Mui-selected:hover': {
                          backgroundColor: 'accent.light',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32, color: active ? 'primary.main' : 'text.secondary' }}>
                        {cmd.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={cmd.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          color: 'text.primary',
                        }}
                      />
                      {cmd.hint && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>
                          {cmd.hint}
                        </Typography>
                      )}
                    </ListItemButton>
                  </Box>
                );
              })}
            </List>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 2,
            py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.subtle',
            fontSize: 11,
            color: 'text.secondary',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
          }}
        >
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span style={{ marginLeft: 'auto' }}>⌘K to toggle</span>
        </Box>
      </Dialog>
    </>
  );
}
