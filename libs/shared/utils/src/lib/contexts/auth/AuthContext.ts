'use client';

import { createContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  id?: number;
  /**
   * Synchronize the auth state by refetching auth check
   */
  synchronizeAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
