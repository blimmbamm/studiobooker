'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useQuery } from '../../hooks';
import { AuthContext } from './AuthContext';
import { checkAuth } from '../../api/protected';

export function AuthProvider(props: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data,
    isLoading,
    isSuccess: isAuthenticated,
    isError,
    refetch: synchronizeAuth,
  } = useQuery({
    queryKey: ['auth-check'],
    queryFn: checkAuth,
    staleTime: 0,
  });

  const { id } = data || {};

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
        id,
        synchronizeAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
