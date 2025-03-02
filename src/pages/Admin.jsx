import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, TextField, Button, FormControl, 
  InputLabel, Select, MenuItem, Tabs, Tab, Badge, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
  IconButton, Paper, Alert
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { format } from 'date-fns';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import CommentIcon from '@mui/icons-material/Comment';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';

function Admin() {
  const { addPost, posts, messages, markMessageAsRead, addCommentReply, addMessageReply, fetchPosts, error: postError } = usePosts();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ success: false, error: null });

    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error('Please provide both title and content');
      }

      const result = await addPost({
        title: formData.title.trim(),
        content: formData.content.trim()
      });
      
      if (result.success) {
        setFormData({ title: '', content: '' });
        setSubmitStatus({ success: true, error: null });
      } else {
        setSubmitStatus({ success: false, error: result.error || 'Failed to create post' });
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setSubmitStatus({ success: false, error: err.message || 'Failed to create post' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadMessages = messages.filter(m => !m.read).length;
  const allComments = posts.flatMap(post => post.comments);

  const handleCommentReply = (postId, commentId, replyText) => {
    addCommentReply(postId, commentId, {
      text: replyText,
      author: 'Admin'
    });
  };

  const handleMessageReply = (messageId, replyText) => {
    addMessageReply(messageId, replyText);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
          Admin Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
            <Tab label="Messages" value="1" icon={<Badge badgeContent={unreadMessages} color="error"><EmailIcon /></Badge>} />
            <Tab label="Comments" value="2" icon={<CommentIcon />} />
            <Tab label="New Post" value="3" />
          </Tabs>
        </Box>

        <TabPanel value="1">
          <List>
            {messages.map((message) => (
              <Paper key={message.id} sx={{ mb: 2, p: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">{message.name}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {message.email}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>{message.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(message.date, 'PPP')}
                  </Typography>
                </Box>

                {message.replies?.map((reply) => (
                  <Box 
                    key={reply.id} 
                    sx={{ 
                      ml: 2, 
                      p: 1.5, 
                      bgcolor: 'primary.light',
                      color: 'white',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <Typography variant="subtitle2">Admin Reply:</Typography>
                    <Typography>{reply.text}</Typography>
                    <Typography variant="caption">
                      {format(reply.date, 'PPP')}
                    </Typography>
                  </Box>
                ))}

                <Box component="form" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleMessageReply(message.id, formData.get('reply'));
                  e.target.reset();
                }}>
                  <TextField
                    name="reply"
                    size="small"
                    placeholder="Write a reply..."
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <Button type="submit" variant="contained" size="small">
                    Send Reply
                  </Button>
                </Box>
              </Paper>
            ))}
          </List>
        </TabPanel>

        <TabPanel value="2">
          <List>
            {posts.map(post => 
              (post.comments || []).map(comment => (
                <Paper key={`${post._id}-${comment._id}`} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    Re: {post.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">{comment.body}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      By {comment.author || 'Anonymous'} on {format(new Date(comment.createdAt), 'PPP')}
                    </Typography>
                  </Box>

                  {comment.replies?.map((reply) => (
                    <Box 
                      key={reply._id} 
                      sx={{ 
                        ml: 2, 
                        p: 1.5, 
                        bgcolor: 'primary.light',
                        color: 'white',
                        borderRadius: 1,
                        mb: 1
                      }}
                    >
                      <Typography variant="subtitle2">Admin Reply:</Typography>
                      <Typography>{reply.text}</Typography>
                      <Typography variant="caption">
                        {format(new Date(reply.createdAt), 'PPP')}
                      </Typography>
                    </Box>
                  ))}

                  <Box component="form" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleCommentReply(post._id, comment._id, formData.get('reply'));
                    e.target.reset();
                  }}>
                    <TextField
                      name="reply"
                      size="small"
                      placeholder="Write a reply..."
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <Button type="submit" variant="contained" size="small">
                      Send Reply
                    </Button>
                  </Box>
                </Paper>
              ))
            )}
          </List>
        </TabPanel>

        <TabPanel value="3">
          {submitStatus.success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Post created successfully!
            </Alert>
          )}

          {submitStatus.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitStatus.error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 3 }}
              required
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={6}
              sx={{ mb: 3 }}
              required
              helperText="Use line breaks to format your content"
              disabled={isLoading}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Post...' : 'Create Post'}
            </Button>
          </Box>
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default Admin;