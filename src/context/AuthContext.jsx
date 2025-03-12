import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
      const response = await fetch('https://virtuebackend-1.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // This is important if your API uses cookies
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return false;
      }

      setIsAuthenticated(true);
      setError('');
      return true;
    } catch (err) {
      setError('Network error. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}