import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Box, TextField, Button, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { format } from 'date-fns';
import { usePosts } from '../context/PostContext';

function PostCard({ post, featured }) {
  const { likePost, addComment, fetchPostComments } = usePosts();
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded && (!post.comments || post.comments.length === 0)) {
      fetchPostComments(post._id);
    }
  }, [expanded, post._id]);

  if (!post) {
    return null;
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    const result = await addComment(post._id, { 
      text: comment, 
      author: 'Anonymous' 
    });

    if (result.success) {
      setComment('');
      setShowCommentForm(false);
    } else {
      console.error('Failed to add comment:', result.error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isNaN(dateObj.getTime()) ? '' : format(dateObj, 'MMMM d, yyyy');
  };

  const comments = post.comments || [];
  const likes = post.likes || 0;

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'visible',
      maxWidth: 900,
      mx: 'auto',
      borderRadius: 2,
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
      ...(featured && {
        p: 2,
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(74, 144, 226, 0.1) 100%)',
      })
    }}>
      <CardContent sx={{ p: featured ? 4 : 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {formatDate(post.date)}
          </Typography>
          <Typography 
            variant={featured ? 'h4' : 'h5'} 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontWeight: featured ? 800 : 700
            }}
          >
            {post.title}
          </Typography>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-line',
            mb: 3,
            fontStyle: 'italic',
            lineHeight: 2,
            fontSize: featured ? '1.1rem' : 'inherit'
          }}
        >
          {post.content}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="caption" color="text.secondary">
            {formatDate(post.date)}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={() => likePost(post.id)}
                color={likes > 0 ? 'secondary' : 'default'}
                size="small"
              >
                <FavoriteIcon />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {likes}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={() => setShowCommentForm(!showCommentForm)}
                size="small"
                color={showCommentForm ? 'primary' : 'default'}
              >
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {comments.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        {comments.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
              Comments
            </Typography>
            {comments.map(comment => (
              <Box key={comment._id} sx={{ mb: 3 }}>
                <Box sx={{ 
                  mb: 2,
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1
                }}>
                  <Typography variant="subtitle2" color="primary">
                    {comment.author || 'Anonymous'}
                  </Typography>
                  <Typography variant="body2">
                    {comment.body}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(comment.createdAt)}
                  </Typography>
                </Box>

                {comment.replies?.map(reply => (
                  <Box 
                    key={reply.id}
                    sx={{ 
                      ml: 4,
                      p: 2,
                      bgcolor: 'primary.light',
                      color: 'white',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <Typography variant="subtitle2">
                      Admin Reply
                    </Typography>
                    <Typography variant="body2">
                      {reply.text}
                    </Typography>
                    <Typography variant="caption">
                      {formatDate(reply.date)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        )}

        {showCommentForm && (
          <Box component="form" onSubmit={handleSubmitComment} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button 
                size="small" 
                onClick={() => setShowCommentForm(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="small" 
                variant="contained"
                disabled={!comment.trim()}
              >
                Post Comment
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PostCard;