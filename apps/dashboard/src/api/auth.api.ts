import { ApiCompany } from '../types/api/company';
import { mapApiToCompany } from '../types/api/company.mapper';
import { client } from './client';

export async function checkAuth() {
  const company = await client.get<ApiCompany>('auth/company', 500);
  return mapApiToCompany(company);
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
