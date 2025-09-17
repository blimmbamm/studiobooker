import {
  logout,
  useAuth,
  useMutation,
  useQueryClient,
} from '@studiobooker/utils';

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
