import { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  useTheme, useMediaQuery, IconButton, Drawer, List, 
  ListItem, ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

function Navigation() {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/author', label: 'Author' },
    { path: '/books', label: 'Books' },
    { path: '/contact', label: 'Contact' },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={RouterLink}
          to={item.path}
          sx={{
            color: isActive(item.path) ? 'primary.main' : 'text.primary',
            fontWeight: isActive(item.path) ? 700 : 500,
            mx: { xs: 0.5, md: 1 },
            '&:hover': {
              backgroundColor: 'rgba(45, 50, 80, 0.04)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      {isAuthenticated ? (
        <Button
          component={RouterLink}
          to="/admin"
          variant="contained"
          sx={{ ml: { xs: 0.5, md: 2 } }}
        >
          Admin
        </Button>
      ) : (
        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          sx={{ ml: { xs: 0.5, md: 2 } }}
        >
          Login
        </Button>
      )}
    </>
  );

  const drawer = (
    <Box onClick={() => setMobileOpen(false)} sx={{ textAlign: 'center', py: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            component={RouterLink} 
            to={item.path}
            sx={{
              color: isActive(item.path) ? 'primary.main' : 'text.primary',
              textAlign: 'center',
            }}
          >
            <ListItemText 
              primary={item.label}
              sx={{ 
                '& .MuiTypography-root': {
                  fontWeight: isActive(item.path) ? 700 : 500,
                }
              }}
            />
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: 'center', pt: 2 }}>
          {isAuthenticated ? (
            <Button
              component={RouterLink}
              to="/admin"
              variant="contained"
              fullWidth
            >
              Admin
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              fullWidth
            >
              Login
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters 
          sx={{ 
            py: { xs: 1.5, md: 2 },
            gap: 2
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexGrow: 1,
              gap: 2
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Poetry of Virtue Logo"
              sx={{
                height: { xs: '40px', md: '50px' },
                width: 'auto'
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #4A90E2 0%, #74AAEB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic'
              }}
            >
              Poetry of Virtue
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                color="primary"
                onClick={() => setMobileOpen(true)}
                sx={{ 
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: '12px',
                  p: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                  sx: {
                    width: '280px',
                    backgroundColor: 'background.default',
                    borderTopLeftRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    p: 2,
                  },
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={logo}
                    alt="Poetry of Virtue Logo"
                    sx={{
                      height: '60px',
                      width: 'auto',
                      mb: 2
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #4A90E2 0%, #74AAEB 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    Poetry of Virtue
                  </Typography>
                </Box>
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                '& .MuiButton-root': {
                  minWidth: '100px',
                },
              }}
            >
              {renderNavItems()}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;