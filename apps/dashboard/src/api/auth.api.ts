import { client } from './client';

export async function checkAuth() {
  return client.get<{ message: string }>('auth/check', 500);
}

export async function signup(email: string, password: string) {
  return client.post<{ message: string }>(
    'auth/register',
    { email, password },
    1000
  );
}

export async function verifySignup(email: string, token: string) {
  return client.post<{ message: string }>(
    'auth/verify',
    { email, token },
    1000
  );
}

export async function login(email: string, password: string) {
  return client.post<{ message: string }>(
    'auth/login',
    {
      email,
      password,
    },
    1500
  );
}

export async function logout() {
  return client.post<{ message: string }>('auth/logout');
}
