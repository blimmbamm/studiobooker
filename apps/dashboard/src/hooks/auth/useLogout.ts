import { useMutation } from '@studiobooker/utils';
import { logout } from '../../api/auth.api';
import { useAuth } from '../../contexts/AuthContext';

export function useLogout() {
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: (_args: void) => logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
    useDefaultErrorHandling: false,
  });
}
