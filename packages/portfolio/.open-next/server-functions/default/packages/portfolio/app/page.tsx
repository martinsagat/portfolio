import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Jobs from '@/components/sections/Jobs';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
import Hobbies from '@/components/sections/Hobbies';
import Contact from '@/components/sections/Contact';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', width: '100%' }}>
      <Nav />
      <Box
        component="main"
        sx={{
          width: '100%',
          margin: '0 auto',
          pl: { xs: 0, lg: 0 },
        }}
      >
        <Hero />
        <About />
        <Jobs />
        <Blog />
        <Projects />
        <Hobbies />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
