import { TextField } from '@mui/material';

import { AuthForm } from '@studiobooker/utils';
import { useSignup } from './useSignup';

export default function RegisterPage() {
  const {
    email,
    password,
    confirmPassword,
    emailIsError,
    passwordIsError,
    confirmPasswordIsError,
    changeEmail,
    changePassword,
    changeConfirmPassword,
    checkEmail,
    checkPassword,
    checkConfirmPassword,
    handleSignup,
    signupIsPending,
    signupIsError,
  } = useSignup();

  return (
    <AuthForm
      title="Signup"
      onSubmit={handleSignup}
      isSubmitting={signupIsPending}
      isError={signupIsError}
      errorMessage="Something went wrong."
    >
      <TextField
        label="E-mail"
        type="email"
        value={email}
        onChange={changeEmail}
        error={emailIsError}
        helperText={emailIsError && 'Invalid e-mail.'}
        onBlur={checkEmail}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={changePassword}
        error={passwordIsError}
        helperText={passwordIsError && 'Invalid password.'}
        onBlur={checkPassword}
        // slotProps={{input: {endAdornment: ... }}}
      />
      <TextField
        label="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={changeConfirmPassword}
        error={confirmPasswordIsError}
        helperText={confirmPasswordIsError && "Passwords don't match."}
        onBlur={checkConfirmPassword}
      />
    </AuthForm>
  );
}
