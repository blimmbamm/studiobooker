import { useMutation } from '@studiobooker/utils';
import { logout } from '../../api/auth.api';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';

export function useLogout() {
  const { synchronizeAuth } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_args: void) => logout(),
    onSettled: () => {
      queryClient.clear();
      synchronizeAuth();
    },
    useDefaultErrorHandling: false,
  });
}
