import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { PropsWithChildren } from 'react';

export default function GuestRoute(props: PropsWithChildren) {
  const { isAuthenticated, loading } = useAuth();

  if(loading) return <h1>Loading...</h1>

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />;
  }

  return props.children;
}
