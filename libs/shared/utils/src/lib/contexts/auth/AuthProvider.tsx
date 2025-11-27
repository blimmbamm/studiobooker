'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack, Typography } from '@mui/material';

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

  const [extraMessage, setExtraMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setExtraMessage(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <Stack marginTop={'20dvh'} textAlign={'center'} gap={3}>
        <CircularProgress sx={{ margin: 'auto' }} />
        {extraMessage && (
          <Typography fontSize={'1.5rem'}>
            Be patient, the backend service is booting. 😊
          </Typography>
        )}
      </Stack>
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
