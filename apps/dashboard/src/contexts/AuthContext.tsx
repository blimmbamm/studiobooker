import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQuery } from '@studiobooker/utils';
import { checkAuth } from '../api/auth.api';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider(props: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: ['auth-check'],
    queryFn: checkAuth,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true);
    }

    if (isError) {
      const isInAuthRoute = location.pathname.startsWith('/auth');

      if (!isInAuthRoute) {
        navigate('/auth/login', { replace: true });
      }
    }
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
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
