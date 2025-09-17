import { client } from '../../http';

export async function signup(email: string, password: string) {
  return client.post<{ message: string }>('auth/register', { email, password });
}

export async function verifySignup(email: string, token: string) {
  return client.post<{ message: string }>('auth/verify', { email, token });
}

export async function login(email: string, password: string) {
  return client.post<{ message: string }>('auth/login', {
    email,
    password,
  });
}
