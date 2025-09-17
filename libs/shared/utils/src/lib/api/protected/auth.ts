import { client } from '../../http';

export async function checkAuth() {
  return client.get<{ message: string; id: number }>('auth/check');
}

export async function logout() {
  return client.post<{ message: string }>('auth/logout');
}
