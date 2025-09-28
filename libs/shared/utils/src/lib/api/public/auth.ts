import { client } from '../../http';

export async function signup(email: string, password: string) {
  return client.post<{ message: string }>('auth/register', { email, password });
}

export async function verifySignup(
  email: string,
  token: string,
  timezone: string
) {
  return client.post<{ message: string }>('auth/verify', {
    email,
    token,
    timezone,
  });
}

export async function login(email: string, password: string) {
  return client.post<{ message: string }>('auth/login', {
    email,
    password,
  });
}
