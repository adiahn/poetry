import { useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import PostCard from '../components/PostCard';
import { usePosts } from '../context/PostContext';

function Posts() {
  const { posts, fetchPosts, error } = usePosts();

  useEffect(() => {
    fetchPosts();

    // Optional: Fetch posts when the window regains focus
    const handleFocus = () => {
      fetchPosts();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (error) {
    return (
      <Container>
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Posts; 