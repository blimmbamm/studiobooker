import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from '@studiobooker/utils';
import { checkAuth, login, logout } from '../api/auth.api';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginDummy: () => void;
  login: (inputs: { email: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider(props: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: ['auth-check'],
    queryFn: checkAuth,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true);
    }

    if (isError) {
      navigate('/auth/login');
    }
  }, [isSuccess, isError, navigate]);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      setIsAuthenticated(true);
      navigate('/dashboard');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: (_args: void) => logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginDummy: () =>
          loginMutation.mutate({ email: 'a@b.de', password: 'password' }),
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('useAuth must be used within AuthProvider');

  return authContext;
}
