import { ChangeEvent, useState } from 'react';

import { useMutation } from '@studiobooker/utils';
import { verifySignup } from '../../../api/auth.api';

export function useVerifySignup() {
  const [token, setToken] = useState('');

  // Whether token input should be displayed in error state:
  const [isError, setIsError] = useState(false);

  function changeToken(e: ChangeEvent<HTMLInputElement>) {
    if (/^\d{0,6}$/.test(e.target.value)) {
      setToken(e.target.value);
      setIsError(false);
    }
  }

  const verifySignupMutation = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      verifySignup(email, token),
    onSuccess: () => {},
    onError: () => {
      setIsError(true);
    },
    useDefaultErrorHandling: false,
  });

  function handleVerifySignup(email: string) {
    const tokenIsInvalid = token.length !== 6;
    setIsError(tokenIsInvalid);

    if (!tokenIsInvalid) {
      verifySignupMutation.mutate({ email, token });
    }
  }

  return {
    token,
    changeToken,
    handleVerifySignup,
    isError,
    isPending: verifySignupMutation.isPending,
    isSuccess: verifySignupMutation.isSuccess
  };
}
