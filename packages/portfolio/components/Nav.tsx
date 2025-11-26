'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import { config } from '@/lib/config';
import HexagonLogo from '@/components/HexagonLogo';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

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
        {config.navLinks.map((link) => (
          <ListItem key={link.name} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(link.url)}
              sx={{ textAlign: 'center' }}
            >
              {link.name}
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/static/resume.pdf"
            download
            sx={{ textAlign: 'center' }}
          >
            <DownloadIcon sx={{ mr: 1 }} />
            Resume
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: trigger ? 'rgba(10, 24, 46, 0.95)' : 'transparent',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          boxShadow: trigger ? 1 : 0,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '1200px', width: '100%', mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <HexagonLogo size={40} onClick={() => router.push('/')} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {config.navLinks.map((link) => (
                <Button
                  key={link.name}
                  onClick={() => handleNavClick(link.url)}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Button
            component="a"
            href="/static/resume.pdf"
            download
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon fontSize="small" />}
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: 'text.secondary',
              borderColor: 'text.secondary',
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.main',
                borderColor: 'primary.main',
              },
            }}
          >
            Resume
          </Button>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
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
            backgroundColor: 'background.default',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

