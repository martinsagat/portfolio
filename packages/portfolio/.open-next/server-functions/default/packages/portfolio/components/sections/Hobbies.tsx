import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { getHobbies, type Hobby } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';

export default async function Hobbies() {
  const hobbies = await getHobbies();
  return (
    <Section id="interests">
      <SectionTitle>Things I enjoy</SectionTitle>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {hobbies.map((hobby, i) => (
          <HobbyCard key={i} hobby={hobby} />
        ))}
      </Box>
    </Section>
  );
}

function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <Card variant="outlined" sx={{ userSelect: 'none' }}>
      <CardContent>
        {hobby.images && hobby.images.length > 0 && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 200,
              mb: 2,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={hobby.images[0]}
              alt={hobby.title}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: hobby.title.toLowerCase() === 'climbing' ? 'top' : 'center',
              }}
            />
          </Box>
        )}
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          {hobby.title}
        </Typography>
        <Typography
          component="div"
          variant="body2"
          dangerouslySetInnerHTML={{ __html: hobby.htmlContent }}
          sx={{
            color: 'text.secondary',
            '& p': { margin: 0 },
          }}
        />
      </CardContent>
    </Card>
  );
}
