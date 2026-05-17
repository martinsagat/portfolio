import { Box } from '@mui/material';
import { getPosts } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';
import { PostCard } from './PostCard';

export default async function Blog() {
  const posts = await getPosts(3);
  return (
    <Section id="blog">
      <SectionTitle>Latest Articles</SectionTitle>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </Box>
    </Section>
  );
}
