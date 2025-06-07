import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute(props: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;

  if (!isAuthenticated) {
    return <Navigate to={'/auth/login'} />;
  }

  return props.children;
}
