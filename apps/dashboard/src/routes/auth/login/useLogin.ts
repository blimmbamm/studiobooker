import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useMutation } from '@studiobooker/utils';
import { login } from '../../../api/auth.api';

export function useLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { synchronizeAuth } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: synchronizeAuth,
    useDefaultErrorHandling: false,
  });

  const [showError, setShowError] = useState(false);

  function handleChange() {
    setShowError(false);
  }

  function handleLogin() {
    loginMutation.mutate({
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    });
  }

  useEffect(() => {
    setShowError(loginMutation.isError);
  }, [loginMutation.isError]);

  return {
    emailRef,
    passwordRef,
    handleLogin,
    handleChange,
    showError,
    loginMutation,
  };
}
