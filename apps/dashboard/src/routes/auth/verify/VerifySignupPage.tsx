import { Location, Navigate, useLocation, NavLink } from 'react-router-dom';
import {
  TextField,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

import { AuthForm, CenteredCard } from '@studiobooker/utils';
import { useVerifySignup } from './useVerifySignup';

export default function VerifySignupPage() {
  const location: Location<{ email?: string }> = useLocation();

  const email = location.state?.email;

  const {
    token,
    changeToken,
    handleVerifySignup,
    isError,
    isPending,
    isSuccess,
  } = useVerifySignup();

  if (!email) return <Navigate to="/auth/login" replace />;

  if (isSuccess)
    return (
      <CenteredCard sx={{ textAlign: 'center' }}>
        <CardHeader title="Success!" />
        <CardContent>You successfully confirmed your e-mail.</CardContent>
        <CardActions>
          <Button
            component={NavLink}
            to="/auth/login"
            replace
            variant="contained"
            sx={{ margin: 'auto' }}
          >
            Go to login
          </Button>
        </CardActions>
      </CenteredCard>
    );

  return (
    <AuthForm
      title="Verification"
      isSubmitting={isPending}
      onSubmit={() => handleVerifySignup(email)}
    >
      <TextField
        label="Token"
        value={token}
        onChange={changeToken}
        error={isError}
        helperText={isError && 'Invalid token.'}
        autoComplete="off"
      />
    </AuthForm>
  );
}
