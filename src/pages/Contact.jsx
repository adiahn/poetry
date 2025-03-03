import { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { usePosts } from '../context/PostContext';

function Contact() {
  const { addMessage } = usePosts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addMessage(formData);
    
    if (result.success) {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(true);
      setError('');
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setError(result.error || 'Failed to send message');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" 
        sx={{ 
          textAlign: 'center',
          mb: 4,
          color: 'primary.main',
          fontStyle: 'italic'
        }}>
        Contact Us
      </Typography>

      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your message has been sent successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ 
        backgroundColor: 'background.paper',
        p: 4,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          label="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          multiline
          rows={6}
          sx={{ mb: 3 }}
          required
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          size="large"
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
}

export default Contact;