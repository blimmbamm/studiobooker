import { ApiCompany } from '../types/api/company';
import { mapApiToCompany } from '../types/api/company.mapper';
import { client } from './client';

export async function checkAuth() {
  const company = await client.get<ApiCompany>('auth/company', 300);
  return mapApiToCompany(company);
}

export async function login(email: string, password: string) {
  return client.post<{ message: string }>('auth/login', {
    email,
    password,
  }, 1500);
}

export async function logout() {
  return client.post<{ message: string }>('auth/logout');
}
