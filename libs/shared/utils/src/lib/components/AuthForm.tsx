import { FormEvent, PropsWithChildren } from 'react';
import { CenteredCard } from './CenteredCard';
import {
  Button,
  CardContent,
  CardHeader,
  CircularProgress,
} from '@mui/material';

type Props = {
  title: string;
  isSubmitting: boolean;
  onSubmit: () => void;
} & PropsWithChildren;

export function AuthForm({ title, isSubmitting, children, onSubmit }: Props) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <CenteredCard component="form" onSubmit={handleSubmit}>
      <CardHeader title={title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
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
