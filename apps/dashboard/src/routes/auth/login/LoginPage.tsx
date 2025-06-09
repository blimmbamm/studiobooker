import {
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import { CenteredCard } from '@studiobooker/utils';
import { useLogin } from './useLogin';

export default function LoginPage() {
  const {
    emailRef,
    passwordRef,
    handleLogin,
    handleChange,
    showError,
    loginMutation: { isPending },
  } = useLogin();

  return (
    <CenteredCard>
      <CardHeader title="Login" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="E-mail"
          inputRef={emailRef}
          type="email"
          autoComplete="off"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          inputRef={passwordRef}
          type="password"
          autoComplete="off"
        />
      </CardContent>
      {showError && (
        <Typography padding={2} variant="caption" color="error">
          Invalid credentials.
        </Typography>
      )}
      <CardActions>
        <Button
          variant="contained"
          disabled={isPending}
          sx={{ margin: 'auto', minWidth: '60%' }}
          onClick={handleLogin}
        >
          {isPending && <CircularProgress color="inherit" size={'1.5rem'} />}
          {!isPending && 'Login'}
        </Button>
      </CardActions>
    </CenteredCard>
  );
}
