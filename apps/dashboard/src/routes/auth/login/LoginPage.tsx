import { TextField } from '@mui/material';

import { AuthForm } from '@studiobooker/utils';
import { useLogin } from './useLogin';
import { usePageTitle } from '../../../hooks/meta-data/usePageTitle';

export default function LoginPage() {
  usePageTitle('Login');

  const {
    emailRef,
    passwordRef,
    handleLogin,
    handleChange,
    showError,
    loginMutation: { isPending },
  } = useLogin();

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      isSubmitting={isPending}
      isError={showError}
      errorMessage="Invalid credentials."
    >
      <TextField
        label="E-mail"
        inputRef={emailRef}
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Password"
        inputRef={passwordRef}
        type="password"
        autoComplete="off"
        onChange={handleChange}
      />
    </AuthForm>
  );
}
