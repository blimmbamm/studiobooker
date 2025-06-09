import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@studiobooker/utils';
import { signup } from '../../../api/auth.api';

export function useSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailIsInvalid = !isValidFullEmail(email);
  const passwordIsInvalid = password.length < 6;
  const confirmPasswordIsInvalid = password !== confirmPassword;

  const formIsInvalid =
    emailIsInvalid || passwordIsInvalid || confirmPasswordIsInvalid;

  const [emailIsError, setEmailIsError] = useState(false);
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [confirmPasswordIsError, setConfirmPasswordIsError] = useState(false);

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => signup(email, password),
    onSuccess: () => {
      navigate('/auth/verify', { state: { email } });
    },
    useDefaultErrorHandling: false,
  });

  function checkEmail() {
    setEmailIsError(emailIsInvalid);
  }

  function checkPassword() {
    setPasswordIsError(passwordIsInvalid);
  }

  function checkConfirmPassword() {
    setConfirmPasswordIsError(confirmPasswordIsInvalid);
  }

  function isValidFullEmail(value: string) {
    const validMailRegex =
      /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

    return validMailRegex.test(value);
  }

  function changeEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailIsError(false);
  }

  function changePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordIsError(false);
  }

  function changeConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
    setConfirmPasswordIsError(false);
  }

  useEffect(() => {
    setConfirmPasswordIsError(confirmPasswordIsInvalid);
  }, [password]);

  function checkErrors() {
    checkEmail();
    checkPassword();
    checkConfirmPassword();
  }

  function handleSignup() {
    checkErrors();

    if (formIsInvalid) {
      return;
    }

    signupMutation.mutate({ email, password });
  }

  return {
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
    signupIsPending: signupMutation.isPending,
    signupIsError: signupMutation.isError,
  };
}
