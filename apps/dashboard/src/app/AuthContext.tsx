import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider(props: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // verify authentication status by fetching /auth/company
    async function checkAuthentication() {
      setLoading(true);

      const response = await fetch('http://localhost:3000/auth/company', {
        method: 'GET',
        credentials: 'include',
      });

      // await new Promise((resolve) => setTimeout(resolve, 3000));

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        navigate('/auth/login');
      }
      setLoading(false);
    }

    checkAuthentication();
  }, []);

  async function logout() {
    // What if this fails? User should nevertheless be client-side logged out, i guess
    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setIsAuthenticated(false);
  }

  async function login() {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'a@b.de', password: 'password' }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('useAuth must be used within AuthProvider');

  return authContext;
}
