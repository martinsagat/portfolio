import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { config } from '@/lib/config';
import { OutlinedCTAButton, Section } from '@/components/ui';

export default function Contact() {
  return (
    <Section id="contact" background="subtle" maxWidth="md">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Get In Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}
        >
          I&apos;m currently looking for new opportunities, my inbox is always open. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to you!
        </Typography>
        <OutlinedCTAButton href={`mailto:${config.email}`} startIcon={<EmailIcon />}>
          Say Hello
        </OutlinedCTAButton>
      </Box>
    </Section>
  );
}
