import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';

import { useAuth } from '../contexts/AuthContext';

export default function GuestRoute(props: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />;
  }

  return props.children;
}
