import { useMutation } from '@studiobooker/utils';
import { logout } from '../../api/auth.api';
import { useAuth } from '../../contexts/AuthContext';

export function useLogout() {
  const { synchronizeAuth } = useAuth();

  return useMutation({
    mutationFn: (_args: void) => logout(),
    onSettled: synchronizeAuth,
    useDefaultErrorHandling: false,
  });
}
