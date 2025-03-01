import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Contact from './pages/Contact';
import { PostProvider } from './context/PostContext';
import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import Author from './pages/Author';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2', // Lighter blue
      light: '#74AAEB',
      dark: '#2171D1',
    },
    secondary: {
      main: '#FF6B6B', // Keep coral red
      light: '#FF8E8E',
      dark: '#E54848',
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#6B7C93',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.03em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 28px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px -4px rgba(74, 144, 226, 0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4A90E2 0%, #74AAEB 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2171D1 0%, #4A90E2 100%)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px) saturate(180%)',
          borderBottom: '1px solid rgba(230, 232, 240, 0.5)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(74, 144, 226, 0.05)',
    '0 4px 8px rgba(74, 144, 226, 0.08)',
    '0 8px 16px rgba(74, 144, 226, 0.10)',
    // ... rest of the shadows array
  ],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <PostProvider>
          <BrowserRouter>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default'
            }}>
              <Navigation />
              <Box component="main" sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/author" element={<Author />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </BrowserRouter>
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;