import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { CircularProgress } from '@mui/material';

import { useAuth } from '../contexts/AuthContext';

export default function GuestRoute(props: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ display: 'block', margin: 'auto', marginTop: '20dvh' }}
      />
    );
  }

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />;
  }

  return props.children;
}
