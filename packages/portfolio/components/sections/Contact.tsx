import { Box, Container, Typography, Button, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { config } from '@/lib/config';

export default function Contact() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontFamily: 'var(--font-geist-mono)',
              mb: 2,
            }}
          >
            04. What's Next?
          </Typography>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Get In Touch
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
            I'm currently looking for new opportunities, my inbox is always open. Whether you have a
            question or just want to say hi, I'll try my best to get back to you!
          </Typography>
          <Button
            variant="outlined"
            href={`mailto:${config.email}`}
            startIcon={<EmailIcon />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.main',
                color: 'background.default',
              },
            }}
          >
            Say Hello
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

