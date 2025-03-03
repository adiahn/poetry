import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials.email, credentials.password);
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 4, color: 'primary.main' }}>
          Admin Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;