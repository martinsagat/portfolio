import { Box, Card, CardContent, Stack, Typography, Link } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { format } from 'date-fns';
import { TechChip } from '@/components/ui';
import type { Post } from '@/lib/content';

export function PostCard({ post }: { post: Post }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
        maxWidth: { xs: '100%', sm: '400px', md: '350px' },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <BookmarkIcon sx={{ color: 'primary.main', fontSize: 30 }} />
          <Typography variant="captionMono" component="span" sx={{ color: 'text.secondary' }}>
            {format(new Date(post.date), 'MMM dd, yyyy')}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          <Link
            href={post.slug}
            sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
          >
            {post.title}
          </Link>
        </Typography>
        <Typography
          component="div"
          variant="body2"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '& p': { margin: 0 },
          }}
        />
      </CardContent>
      {post.tags && post.tags.length > 0 && (
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
            sx={{ justifyContent: 'center' }}
          >
            {post.tags.map((tag, i) => (
              <TechChip key={i} label={tag} />
            ))}
          </Stack>
        </Box>
      )}
    </Card>
  );
}
