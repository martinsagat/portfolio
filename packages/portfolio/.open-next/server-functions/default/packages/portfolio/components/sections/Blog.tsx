'use client';

import { Box, Container, Typography, Card, CardContent, Stack, Chip, Link } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Post {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  draft?: boolean;
  htmlContent: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts?limit=3')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Box
      component="section"
      id="blog"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>
          Latest Articles
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <BookmarkIcon sx={{ color: 'primary.main', fontSize: 30 }} />
        </Box>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          <Link href={post.slug} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
            {post.title}
          </Link>
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: '14px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '& p': {
              margin: 0,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '12px',
            display: 'block',
            mb: 1.5,
          }}
        >
          {format(new Date(post.date), 'MMM dd, yyyy')}
        </Typography>
        {post.tags && (
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {post.tags.map((tag: string, i: number) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: 'accent.light',
                  color: 'primary.main',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '11px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                  },
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

