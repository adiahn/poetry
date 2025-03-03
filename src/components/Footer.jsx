import { Box, Container, Typography, IconButton, Link, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 6, md: 8 },
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF6B6B 0%, #1A2238 100%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 6, md: 4 },
          textAlign: { xs: 'center', md: 'left' },
        }}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Virtue Education
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9,
                lineHeight: 1.8,
                maxWidth: { xs: '100%', md: '80%' },
              }}
            >
              Inspiring minds through poetry and moral wisdom, creating a community of thoughtful individuals.
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}>
            <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
              Connect With Us
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
            }}>
              {[
                { icon: FacebookIcon, url: 'https://facebook.com' },
                { icon: TwitterIcon, url: 'https://twitter.com' },
                { icon: InstagramIcon, url: 'https://instagram.com' },
              ].map((social, index) => (
                <IconButton 
                  key={index}
                  component={Link}
                  href={social.url}
                  target="_blank"
                  sx={{ 
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    p: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-4px)',
                      border: '2px solid rgba(255,255,255,0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Subscribe to receive our latest posts and moral insights.
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  flex: 1,
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>

        <Box 
          sx={{ 
            mt: { xs: 6, md: 8 },
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Virtue Education. All rights reserved.
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mt: 4,
        }}>
          {/* Contact Information */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon color="primary" fontSize="small" />
              <Typography variant="body2">
                +234 803 863 6065
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon color="primary" fontSize="small" />
              <Link 
                href="mailto:poetryofvirtue@gmail.com"
                color="inherit"
                underline="hover"
              >
                poetryofvirtue@gmail.com
              </Link>
            </Box>
          </Box>

          {/* Social Media Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                href="https://www.facebook.com/profile.php?id=100067198263509"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                href="https://www.instagram.com/poetry_of_virtue/"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;