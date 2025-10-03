import {
  login,
  NavButton,
  useAlert,
  useAuth,
  useMutation,
} from '@studiobooker/utils';

export default function DemoLogin() {
  const { synchronizeAuth } = useAuth();

  const { show } = useAlert();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: synchronizeAuth,
    onError: () =>
      show({ severity: 'error', message: "Hmm, this didn't work. :(" }),
    useDefaultErrorHandling: false,
  });

  function handleDemoLogin() {
    loginMutation.mutate({
      email: 'some@thing.de',
      password: 'somethingsafe123',
    });
  }

  return (
    <NavButton onClick={handleDemoLogin} loading={loginMutation.isPending}>
      Check out demo
    </NavButton>
  );
}
