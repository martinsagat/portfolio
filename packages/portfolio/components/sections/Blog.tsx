'use client';

import { Box, Container, Typography, Card, CardContent, Stack, Chip, Link, useTheme } from '@mui/material';
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
  const theme = useTheme();
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
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : 'background.default',
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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
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
    <Card
      elevation={0}
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
        maxWidth: { xs: '100%', sm: '400px', md: '350px' },
        boxShadow: 'none',
        '&:hover': {
          borderColor: 'divider',
          transform: 'none',
          boxShadow: 'none',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <BookmarkIcon sx={{ color: 'primary.main', fontSize: 30 }} />
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              fontSize: '12px',
            }}
          >
            {format(new Date(post.date), 'MMM dd, yyyy')}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          <Link href={post.slug} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
            {post.title}
          </Link>
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          sx={{
            mb: 0,
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
      </CardContent>
      {post.tags && (
        <Box
          sx={{
            mt: 2,
            pt: 2,
            px: { xs: 2.5, md: 3 },
            mx: { xs: 2.5, md: 3 },
            mb: { xs: 2.5, md: 3 },
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack 
            direction="row" 
            spacing={1} 
            flexWrap="wrap" 
            gap={1}
            sx={{
              justifyContent: 'center',
            }}
          >
            {post.tags.map((tag: string, i: number) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: 'accent.light',
                  color: 'primary.main',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: '0.75rem',
                  height: '28px',
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Card>
  );
}

