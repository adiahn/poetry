import { Container, Grid, Typography, Box, Divider } from '@mui/material';
import PostCard from '../components/PostCard';
import { usePosts } from '../context/PostContext';
import { format } from 'date-fns';

function Home() {
  const { posts } = usePosts();
  
  // Sort posts by date, newest first
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Get the latest post
  const latestPost = sortedPosts[0];
  // Get the rest of the posts
  const otherPosts = sortedPosts.slice(1);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          color: 'primary.main',
          mb: 8,
          fontStyle: 'italic'
        }}
      >
        Virtue Education
      </Typography>

      {latestPost && (
        <>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'text.secondary',
                letterSpacing: 2,
                display: 'block',
                mb: 2,
                textAlign: 'center'
              }}
            >
              Latest Post
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <PostCard post={latestPost} featured />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ mb: 6 }} />
        </>
      )}

      <Typography 
        variant="overline" 
        sx={{ 
          color: 'text.secondary',
          letterSpacing: 2,
          display: 'block',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Previous Posts
      </Typography>

      <Grid container spacing={4}>
        {sortedPosts.map(post => (
          <Grid item xs={12} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;