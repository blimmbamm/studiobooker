import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@studiobooker/utils';

export default function GuestRoute(props: PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />;
  }

  return props.children;
}
