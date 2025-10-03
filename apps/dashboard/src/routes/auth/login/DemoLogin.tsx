import { Button } from '@mui/material';
import { login, useAuth, useMutation } from '@studiobooker/utils';

export default function DemoLogin() {
  const { synchronizeAuth } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: synchronizeAuth,
    useDefaultErrorHandling: false,
  });

  function handleDemoLogin() {
    loginMutation.mutate({
      email: 'some@thing.de',
      password: 'somethingsafe123',
    });
  }

  return (
    <Button
      color="inherit"
      onClick={handleDemoLogin}
      loading={loginMutation.isPending}
    >
      Check out demo
    </Button>
  );
}
