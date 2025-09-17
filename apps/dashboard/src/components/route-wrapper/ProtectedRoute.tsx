import { useAuth } from '@studiobooker/utils';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props: PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={'/auth/login'} />;
  }

  return props.children;
}
