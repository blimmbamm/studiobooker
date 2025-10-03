import { getClient } from '../../http';

export async function checkAuth() {
  return getClient().get<{ message: string; id: number }>('auth/check');
}

export async function logout() {
  return getClient().post<{ message: string }>('auth/logout');
}
