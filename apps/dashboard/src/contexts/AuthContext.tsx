import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQuery } from '@studiobooker/utils';
import { checkAuth } from '../api/auth.api';
import { CircularProgress } from '@mui/material';

type AuthContextType = {
  isAuthenticated: boolean;
  /**
   * Synchronize the auth state by refetching auth check
   */
  synchronizeAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider(props: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    isSuccess: isAuthenticated,
    isError,
    refetch: synchronizeAuth,
  } = useQuery({
    queryKey: ['auth-check'],
    queryFn: checkAuth,
  });

  useEffect(() => {
    if (isError) {
      const isInAuthRoute = location.pathname.startsWith('/auth');

      if (!isInAuthRoute) {
        navigate('/auth/login', { replace: true });
      }
    }
  }, [isAuthenticated, isError, navigate]);

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ display: 'block', margin: 'auto', marginTop: '20dvh' }}
      />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        synchronizeAuth,
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
