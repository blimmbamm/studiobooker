import { FormEvent, PropsWithChildren } from 'react';
import { CenteredCard } from './CenteredCard';
import {
  Button,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@mui/material';

type Props = {
  title: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  isError?: boolean;
  errorMessage?: string;
} & PropsWithChildren;

export function AuthForm({
  title,
  isSubmitting,
  children,
  onSubmit,
  isError,
  errorMessage,
}: Props) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <CenteredCard component="form" onSubmit={handleSubmit}>
      <CardHeader title={title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
        {isError && (
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ margin: 'auto', minWidth: '60%' }}
        >
          {isSubmitting && <CircularProgress color="inherit" size={'1.5rem'} />}
          {!isSubmitting && 'Submit'}
        </Button>
      </CardContent>
    </CenteredCard>
  );
}
