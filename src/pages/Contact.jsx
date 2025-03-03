import { useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, Alert,
  Grid, Paper, Link, Divider 
} from '@mui/material';
import { usePosts } from '../context/PostContext';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

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

  const phoneNumber = '+2348038636065';
  const whatsappMessage = encodeURIComponent('Hello, I would like to know more about Poetry of Virtue.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" 
        sx={{ 
          textAlign: 'center',
          mb: 6,
          color: 'primary.main',
          fontStyle: 'italic'
        }}>
        Contact Us
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 4, color: 'primary.main' }}>
              Get in Touch
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Phone */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography>
                    +234 803 863 6065
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Link 
                    href="mailto:poetryofvirtue@gmail.com"
                    color="inherit"
                    underline="hover"
                  >
                    poetryofvirtue@gmail.com
                  </Link>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Social Media */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Link 
                    href="https://www.facebook.com/profile.php?id=100067198263509"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon color="primary" />
                  </Link>
                  <Link 
                    href="https://www.instagram.com/poetry_of_virtue/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon color="primary" />
                  </Link>
                </Box>
              </Box>

              {/* WhatsApp Button */}
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppIcon />}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{ mt: 2 }}
              >
                Send WhatsApp Message
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4, color: 'primary.main' }}>
              Send us a Message
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

            <Box component="form" onSubmit={handleSubmit}>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;