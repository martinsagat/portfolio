'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Switch, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { config } from '@/lib/config';
import HexagonLogo from '@/components/HexagonLogo';
import { useThemeMode } from '@/theme/ThemeContext';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const { mode, toggleMode } = useThemeMode();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = config.navLinks
        .map(link => {
          const hash = link.url.split('#')[1];
          if (!hash) return null;
          const element = document.getElementById(hash);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return {
            id: hash,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      // Find the section currently in view
      const navBarHeight = 80;
      const viewportMiddle = window.innerHeight / 2;
      
      let currentSection = '';
      
      // Check if we're at the top of the page
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Find the section that's closest to the viewport middle
      for (const section of sections) {
        if (section.top <= viewportMiddle && section.bottom >= viewportMiddle) {
          currentSection = section.id;
          break;
        }
      }

      // If no section is in the middle, find the one closest to the top
      if (!currentSection) {
        const sortedSections = sections
          .filter(s => s.top <= navBarHeight + 100)
          .sort((a, b) => b.top - a.top);
        
        if (sortedSections.length > 0) {
          currentSection = sortedSections[0].id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (url: string) => {
    setMobileOpen(false);
    
    // Handle hash links (/#about, #about)
    if (url.includes('#')) {
      const hashIndex = url.indexOf('#');
      const hash = url.substring(hashIndex);
      const path = url.substring(0, hashIndex) || '/';
      
      // If we're already on the target path, just scroll
      if (pathname === path) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }
      
      // Otherwise navigate to the path, then scroll
      router.push(url);
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      return;
    }
    
    // Handle regular routes (like /articles)
    if (url.startsWith('/')) {
      router.push(url);
    }
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', pt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <HexagonLogo size={50} onClick={() => { router.push('/'); setMobileOpen(false); }} />
      </Box>
      <List>
        {config.navLinks.map((link) => {
          const hash = link.url.split('#')[1] || '';
          const isActive = activeSection === hash;
          
          return (
            <ListItem key={link.name} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(link.url)}
                sx={{ 
                  textAlign: 'center',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  backgroundColor: isActive ? 'primary.light' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '1rem',
                  py: 1.5,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: isActive ? 'primary.light' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {link.name}
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/static/resume.pdf"
            download
            sx={{ 
              textAlign: 'center',
              fontSize: '1rem',
              py: 1.5,
            }}
          >
            <DownloadIcon sx={{ mr: 1 }} />
            Resume
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              toggleMode();
            }}
            sx={{ 
              textAlign: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {mode === 'dark' ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
            <ListItemText 
              primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              primaryTypographyProps={{
                sx: { fontSize: '1rem' }
              }}
            />
            <Switch
              checked={mode === 'dark'}
              onChange={toggleMode}
              onClick={(e) => e.stopPropagation()}
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'primary.main',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'primary.main',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const glassStyles = mode === 'dark' 
    ? {
        backgroundColor: trigger ? 'rgba(10, 24, 46, 0.25)' : 'transparent',
        boxShadow: trigger ? '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 0,
        border: trigger ? '1px solid rgba(255, 255, 255, 0.18)' : 'none',
        backgroundImage: trigger ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)' : 'none',
      }
    : {
        backgroundColor: trigger ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        boxShadow: trigger ? '0 4px 16px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)' : 0,
        border: trigger ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
        backgroundImage: trigger ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.95) 100%)' : 'none',
      };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          ...glassStyles,
          backdropFilter: trigger ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: trigger ? 'blur(20px) saturate(180%)' : 'none',
          transition: 'all 0.3s ease',
          borderRadius: trigger ? '9999px' : 0,
          mt: trigger ? 2 : 0,
          left: trigger ? 2 : 0,
          right: trigger ? 2 : 0,
          maxWidth: '1200px',
          width: trigger ? 'calc(100% - 32px)' : '100%',
          mx: 'auto',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          maxWidth: '1200px', 
          width: '100%', 
          mx: 'auto',
          minHeight: { xs: '70px', md: '80px' }!,
          py: { xs: 1, md: 1.5 },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <HexagonLogo size={45} onClick={() => router.push('/')} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {config.navLinks.map((link) => {
                const hash = link.url.split('#')[1] || '';
                const isActive = activeSection === hash;
                
                return (
                  <Button
                    key={link.name}
                    onClick={() => handleNavClick(link.url)}
                    size="small"
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontSize: '1rem',
                      px: 2,
                      py: 1,
                      minWidth: 'auto',
                      backgroundColor: isActive ? 'primary.light' : 'transparent',
                      fontWeight: isActive ? 600 : 400,
                      '&:hover': { 
                        color: 'primary.main',
                        backgroundColor: isActive ? 'primary.light' : 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={toggleMode}
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Button
              component="a"
              href="/static/resume.pdf"
              download
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'text.secondary',
                borderColor: 'text.secondary',
                minWidth: 'auto',
                px: 2,
                mr: -1,
                py: 1,
                fontSize: '1rem',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                },
              }}
            >
              Resume
            </Button>
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: 'none' },
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: mode === 'dark' 
              ? 'rgba(10, 24, 46, 0.25)' 
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: mode === 'dark'
              ? '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 4px 16px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
            border: mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.18)'
              : '1px solid rgba(0, 0, 0, 0.06)',
            backgroundImage: mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.95) 100%)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

