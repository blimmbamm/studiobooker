import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('useAuth must be used within AuthProvider');

  return authContext;
}

export function useOptionalAuth() {
  return useContext(AuthContext);
}
