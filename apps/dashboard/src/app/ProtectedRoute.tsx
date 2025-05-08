import { PropsWithChildren } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props: PropsWithChildren) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) {
    return <Navigate to={'/auth/login'} />;
  }

  return props.children;
}
